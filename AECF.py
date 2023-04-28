import numpy as np
from keras.layers import Input, Dense
from keras.models import Model
from scipy.sparse import csr_matrix


class AE_CF:
    def __init__(self, ratings_mat):
        self.ratings_mat_sparse = csr_matrix(ratings_mat)
        self.user_ratings = []
        self.item_ratings = []
        self.train_cf()

    def embeddings_generator(self, hidden_layer, batch_size):
        num_users = self.ratings_mat_sparse.shape[0]
        indices = np.arange(num_users)
        for start_idx in range(0, num_users, batch_size):
            end_idx = min(start_idx + batch_size, num_users)
            batch_indices = indices[start_idx:end_idx]
            batch_ratings = self.ratings_mat_sparse[batch_indices]
            batch_embeddings = hidden_layer.predict(batch_ratings)
            yield batch_embeddings

    def train_cf(self):
        # Split the data into training and testing sets
        train_size = int(0.8 * self.ratings_mat_sparse.shape[0])
        train_ratings = self.ratings_mat_sparse[:train_size, :]
        test_ratings = self.ratings_mat_sparse[train_size:, :]

        # Build the autoencoder model
        input_layer = Input(shape=(self.ratings_mat_sparse.shape[1],))
        encoded = Dense(16, activation='relu')(input_layer)
        decoded = Dense(
            self.ratings_mat_sparse.shape[1], activation='sigmoid')(encoded)
        autoencoder = Model(input_layer, decoded)

        # Compile the model
        autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

        # Train the model
        autoencoder.fit(train_ratings.toarray(), train_ratings.toarray(), epochs=20, batch_size=32,
                        shuffle=True, validation_data=(test_ratings.toarray(), test_ratings.toarray()))

        # Extract the hidden layer output for all the users and items
        hidden_layer = Model(input_layer, encoded)
        batch_size = 32
        user_embeddings = np.concatenate(
            list(self.embeddings_generator(hidden_layer, batch_size)), axis=0)

        # Compute the similarity between users and items
        user_similarity = np.dot(user_embeddings, user_embeddings.T)
        item_similarity = np.dot(user_embeddings.T, user_embeddings)

        # Use the similarity scores to predict the ratings of the items for each user
        self.user_ratings = np.dot(
            user_similarity, self.ratings_mat_sparse) / np.sum(np.abs(user_similarity), axis=1)
        self.item_ratings = np.dot(
            item_similarity, self.ratings_mat_sparse.T) / np.sum(np.abs(item_similarity), axis=1)

    # Get predicted ratings for user
    def get_user_recommendation(self, user_id):
        user_0_pred_ratings = self.user_ratings[user_id]
        N = 12
        # Sort predicted ratings in descending order
        sorted_item_indices = np.argsort(
            user_0_pred_ratings[0].toarray().flatten())[::-1][:N]
        return sorted_item_indices
