# Building Ratings Matrix
from scipy.sparse import coo_matrix
import numpy as np
from collections import defaultdict
from Business import Business


class Recommendations:
    def __init__(self, business_df, reviews_df, state_name, shorten=False):
        print(f"========Calculating For {state_name} State========")
        self.business_df = business_df
        self.reviews_df = reviews_df
        self.ratings_mat = []
        self.shorten = shorten if isinstance(shorten, bool) else False
        self.user_num_to_user_hash_dict = dict()
        self.user_hash_to_user_num_dict = dict()
        self.business_num_to_business_hash_dict = dict()
        self.business_hash_to_business_num_dict = dict()
        self.business_recommendations = []
        self.business_popularity = []
        self.calculateRatingMatrix()
        self.nonPersonalizedRecommendations()

    def calculateRatingMatrix(self):
        print("Calculating rating matrix...")
        business_list = list(self.business_df['business_id'])
        reviews_df_updated = self.reviews_df[self.reviews_df['business_id'].isin(
            business_list)]

        if (self.shorten):
            print(f"Size Before Cutting Down: {reviews_df_updated.shape[0]}")
            user_counts = reviews_df_updated.groupby(
                'user_id').size().reset_index(name='count')

            # Sort the user_counts dataframe in descending order by count and select the top 100 user_ids
            top_users = user_counts.sort_values(by='count', ascending=False).head(100)[
                'user_id'].tolist()

            # Filter the original dataframe to keep only the records that belong to the top 100 user_ids
            reviews_df_updated = reviews_df_updated[reviews_df_updated['user_id'].isin(
                top_users)]
            print(f"Size After Cutting Down: {reviews_df_updated.shape[0]}")

        unique_business_id = reviews_df_updated['business_id'].unique()
        unique_user_id = reviews_df_updated['user_id'].unique()

        j = 0
        for u in unique_user_id:
            self.user_hash_to_user_num_dict[u] = j
            self.user_num_to_user_hash_dict[j] = u
            j += 1

        j = 0
        for i in unique_business_id:
            self.business_hash_to_business_num_dict[i] = j
            self.business_num_to_business_hash_dict[j] = i
            j += 1

        # Then, use the generated dictionaries to reindex UserID and MovieID in the data_df
        user_list = reviews_df_updated['user_id'].values
        movie_list = reviews_df_updated['business_id'].values
        for j in range(len(reviews_df_updated)):
            user_list[j] = self.user_hash_to_user_num_dict[user_list[j]]
            movie_list[j] = self.business_hash_to_business_num_dict[movie_list[j]]
        reviews_df_updated['user_id'] = user_list
        reviews_df_updated['business_id'] = movie_list

        num_user = len(reviews_df_updated['user_id'].unique())
        num_movie = len(reviews_df_updated['business_id'].unique())

        self.ratings_mat = coo_matrix((reviews_df_updated['stars'].values, (reviews_df_updated['user_id'].values,
                                      reviews_df_updated['business_id'].values)), shape=(num_user, num_movie)).astype(float).toarray()
        print(
            f"Size of Ratings Matrix: {self.ratings_mat.shape[0]}, {self.ratings_mat.shape[1]}")

    def nonPersonalizedRecommendations(self):
        print("Calculating NPR...")
        n = len(self.ratings_mat)  # number of users
        m = len(self.ratings_mat[0])  # number of movies

        # Creating popularity array - size number of movies
        self.business_popularity = np.zeros((m,))
        # claculating the popularity of each movie by summing the values in each column
        self.business_popularity = self.ratings_mat.sum(axis=0)

        self.business_recommendations = np.zeros((n, 50), dtype=np.int32)

        for u in range(self.ratings_mat.shape[0]):
            business_unvisited = np.where(self.ratings_mat[u] == 0)[0]
            unwatched_popularity = self.business_popularity[business_unvisited]
            # Sort the unwatched movies according to popularity and fetch top 50 to recommend
            self.business_recommendations[u] = business_unvisited[np.argsort(
                unwatched_popularity)[::-1]][:50]

    def getNPRForuUser(self, user_num):
        print(f"Non personalized recommendations for User {user_num}:")
        business_list = []
        for i in range(12):
            business_hash = self.getBusinessHashFromBusinessNum(
                self.business_recommendations[0, i])
            business = self.getBusinessInfo(business_hash)
            business_list.append(business)
        return business_list

    def getUserHashFromUserNum(self, user_num):
        return self.user_num_to_user_hash_dict[user_num]

    def getUserNumFromUserHash(self, user_hash):
        return self.user_hash_to_user_num_dict[user_hash]

    def getBusinessHashFromBusinessNum(self, business_num):
        return self.business_num_to_business_hash_dict[business_num]

    def getBusinessNumFromBusinessHash(self, business_hash):
        return self.business_hash_to_business_num_dict[business_hash]

    def getBusinessInfo(self, business_hash):
        bus_df = self.business_df[self.business_df['business_id']
                                  == business_hash].iloc[0]
        return Business(bus_df['name'], bus_df['address'], bus_df['city'], bus_df['state'], bus_df['postal_code'], bus_df['stars'])
