from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import json
import pandas as pd
import pickle
import datetime
from Recommendations import Recommendations
from Business import Business
from AE_CF import AE_CF
import bz2file as bz2
# print("pickle version"+pickle.format_version)


app = Flask(__name__, static_folder='./build', static_url_path="")
CORS(app)

business_df = pd.DataFrame()
reviews_df = pd.DataFrame()
# create an empty dictionary to store the dataframes
hotel_state_df_map = {}
restaurent_state_df_map = {}


def loadCSV():
    print("Loading CSV Files...")
    print(datetime.datetime.now())
    global reviews_df
    reviews_df = pd.read_csv('yelp_academic_dataset_review.csv')
    # user_df = pd.read_csv('yelp_academic_dataset_user.csv')
    global business_df
    business_df = pd.read_csv('yelp_academic_dataset_business.csv')
    business_df = business_df.dropna(subset=['categories'])
    print("Loading CSV Files Completed...")
    print(datetime.datetime.now())
    print("\n")


def getTopStates():
    # Get Top Ten States
    print("Generating Top 10 States Dataframes...")
    unique_states = business_df['state'].unique()
    state_map = dict()
    for s in unique_states:
        state_map[s] = business_df[business_df['state'] == s].shape[0]
    # 'CA' 'MO' 'AZ' 'PA' 'TN' 'FL' 'IN' 'LA' 'AB' 'NV' 'ID' 'DE' 'IL' 'NJ' 'NC' 'CO' 'WA' 'HI' 'UT' 'TX' 'MT' 'MI' 'SD' 'XMS' 'MA' 'VI' 'VT'
    top_states = [state[0] for state in sorted(sorted(state_map.items(
    ), key=lambda x: x[1], reverse=True), key=lambda x: x[1], reverse=True)[:10]]
    print(top_states)

    # Creating mask for Hotels & Travel
    hotel_mask = business_df['categories'].str.contains('Hotels & Travel')
    hotel_df = business_df[hotel_mask]

    # Creating mask for Restaurents
    restaurent_mask = business_df['categories'].str.contains('Restaurants')
    restaurent_df = business_df[restaurent_mask]

    global hotel_state_df_map
    global restaurent_state_df_map

    for state in top_states:
        df_name = f'business_df_{state}'

        hotel_state_df = hotel_df[hotel_df['state'] == state]
        restaurent_state_df = restaurent_df[restaurent_df['state'] == state]

        exec(f"{df_name} = hotel_state_df")
        # add the dataframe to the dictionary with the state abbreviation as the key
        hotel_state_df_map[state] = hotel_state_df

        exec(f"{df_name} = restaurent_state_df")
        # add the dataframe to the dictionary with the state abbreviation as the key
        restaurent_state_df_map[state] = restaurent_state_df


def compressed_pickle(title, data):
    with bz2.BZ2File(title + ".pbz2", "w") as f:
        pickle.dump(data, f)


def decompress_pickle(file):
    data = bz2.BZ2File(file, "rb")
    data = pickle.load(data)
    return data


# loadCSV()
# getTopStates()
hotel_state_rec_map = {}
print("Loading Hotel Data Files...")
print(datetime.datetime.now())
PA_Hotel_Recommendation = decompress_pickle(
    "data/hotel/PA_Hotel_Recommendation.pbz2")
hotel_state_rec_map['PA'] = PA_Hotel_Recommendation
FL_Hotel_Recommendation = decompress_pickle(
    "data/hotel/FL_Hotel_Recommendation.pbz2")
hotel_state_rec_map['FL'] = FL_Hotel_Recommendation
TN_Hotel_Recommendation = decompress_pickle(
    "data/hotel/TN_Hotel_Recommendation.pbz2")
hotel_state_rec_map['TN'] = TN_Hotel_Recommendation
IN_Hotel_Recommendation = decompress_pickle(
    "data/hotel/IN_Hotel_Recommendation.pbz2")
hotel_state_rec_map['IN'] = IN_Hotel_Recommendation
MO_Hotel_Recommendation = decompress_pickle(
    "data/hotel/MO_Hotel_Recommendation.pbz2")
hotel_state_rec_map['MO'] = MO_Hotel_Recommendation
LA_Hotel_Recommendation = decompress_pickle(
    "data/hotel/LA_Hotel_Recommendation.pbz2")
hotel_state_rec_map['LA'] = LA_Hotel_Recommendation
AZ_Hotel_Recommendation = decompress_pickle(
    "data/hotel/AZ_Hotel_Recommendation.pbz2")
hotel_state_rec_map['AZ'] = AZ_Hotel_Recommendation
NJ_Hotel_Recommendation = decompress_pickle(
    "data/hotel/NJ_Hotel_Recommendation.pbz2")
hotel_state_rec_map['NJ'] = NJ_Hotel_Recommendation
NV_Hotel_Recommendation = decompress_pickle(
    "data/hotel/NV_Hotel_Recommendation.pbz2")
hotel_state_rec_map['NV'] = NV_Hotel_Recommendation
AB_Hotel_Recommendation = decompress_pickle(
    "data/hotel/AB_Hotel_Recommendation.pbz2")
hotel_state_rec_map['AB'] = AB_Hotel_Recommendation
print("Loading Hotel Data Files Completed...")
print(datetime.datetime.now())
print("\n")

restaurent_state_rec_map = {}
print("Loading Restaurent Data Files...")
print(datetime.datetime.now())
PA_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/PA_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['PA'] = PA_Restaurent_Recommendation
FL_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/FL_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['FL'] = FL_Restaurent_Recommendation
TN_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/TN_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['TN'] = TN_Restaurent_Recommendation
IN_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/IN_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['IN'] = IN_Restaurent_Recommendation
MO_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/MO_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['MO'] = MO_Restaurent_Recommendation
LA_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/LA_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['LA'] = LA_Restaurent_Recommendation
AZ_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/AZ_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['AZ'] = AZ_Restaurent_Recommendation
NJ_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/NJ_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['NJ'] = NJ_Restaurent_Recommendation
NV_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/NV_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['NV'] = NV_Restaurent_Recommendation
AB_Restaurent_Recommendation = decompress_pickle(
    "data/restaurent/AB_Restaurent_Recommendation.pbz2")
restaurent_state_rec_map['AB'] = AB_Restaurent_Recommendation
print("Loading Restaurent Data Files Completed...")
print(datetime.datetime.now())
print("\n")

hotel_mf_map = {}
print("Loading Hotel MF Files...")
print(datetime.datetime.now())
PA_Hotel_MF = decompress_pickle("data/hotel/PA_Hotel_MF.pbz2")
hotel_mf_map['PA'] = PA_Hotel_MF
FL_Hotel_MF = decompress_pickle("data/hotel/FL_Hotel_MF.pbz2")
hotel_mf_map['FL'] = FL_Hotel_MF
TN_Hotel_MF = decompress_pickle("data/hotel/TN_Hotel_MF.pbz2")
hotel_mf_map['TN'] = TN_Hotel_MF
IN_Hotel_MF = decompress_pickle("data/hotel/IN_Hotel_MF.pbz2")
hotel_mf_map['IN'] = IN_Hotel_MF
MO_Hotel_MF = decompress_pickle("data/hotel/MO_Hotel_MF.pbz2")
hotel_mf_map['MO'] = MO_Hotel_MF
LA_Hotel_MF = decompress_pickle("data/hotel/LA_Hotel_MF.pbz2")
hotel_mf_map['LA'] = LA_Hotel_MF
AZ_Hotel_MF = decompress_pickle("data/hotel/AZ_Hotel_MF.pbz2")
hotel_mf_map['AZ'] = AZ_Hotel_MF
NJ_Hotel_MF = decompress_pickle("data/hotel/NJ_Hotel_MF.pbz2")
hotel_mf_map['NJ'] = NJ_Hotel_MF
NV_Hotel_MF = decompress_pickle("data/hotel/NV_Hotel_MF.pbz2")
hotel_mf_map['NV'] = NV_Hotel_MF
AB_Hotel_MF = decompress_pickle("data/hotel/AB_Hotel_MF.pbz2")
hotel_mf_map['AB'] = AB_Hotel_MF
print("Loading Hotel MF Files Completed...")
print(datetime.datetime.now())
print("\n")

restaurent_mf_map = {}
print("Loading Restaurent MF Files...")
print(datetime.datetime.now())
PA_Restaurent_MF = decompress_pickle(
    "data/restaurent/PA_Restaurent_MF.pbz2")
restaurent_mf_map['PA'] = PA_Restaurent_MF
FL_Restaurent_MF = decompress_pickle(
    "data/restaurent/FL_Restaurent_MF.pbz2")
restaurent_mf_map['FL'] = FL_Restaurent_MF
TN_Restaurent_MF = decompress_pickle(
    "data/restaurent/TN_Restaurent_MF.pbz2")
restaurent_mf_map['TN'] = TN_Restaurent_MF
IN_Restaurent_MF = decompress_pickle(
    "data/restaurent/IN_Restaurent_MF.pbz2")
restaurent_mf_map['IN'] = IN_Restaurent_MF
MO_Restaurent_MF = decompress_pickle(
    "data/restaurent/MO_Restaurent_MF.pbz2")
restaurent_mf_map['MO'] = MO_Restaurent_MF
LA_Restaurent_MF = decompress_pickle(
    "data/restaurent/LA_Restaurent_MF.pbz2")
restaurent_mf_map['LA'] = LA_Restaurent_MF
AZ_Restaurent_MF = decompress_pickle(
    "data/restaurent/AZ_Restaurent_MF.pbz2")
restaurent_mf_map['AZ'] = AZ_Restaurent_MF
NJ_Restaurent_MF = decompress_pickle(
    "data/restaurent/NJ_Restaurent_MF.pbz2")
restaurent_mf_map['NJ'] = NJ_Restaurent_MF
NV_Restaurent_MF = decompress_pickle(
    "data/restaurent/NV_Restaurent_MF.pbz2")
restaurent_mf_map['NV'] = NV_Restaurent_MF
AB_Restaurent_MF = decompress_pickle(
    "data/restaurent/AB_Restaurent_MF.pbz2")
restaurent_mf_map['AB'] = AB_Restaurent_MF
print("Loading Restaurent MF Files Completed...")
print(datetime.datetime.now())
print("\n")


hotel_aecf_map = {}
print("Loading Hotel AECF Files...")
print(datetime.datetime.now())
PA_Hotel_AECF = decompress_pickle(
    "data/hotel/PA_Hotel_AECF.pbz2")
hotel_aecf_map['PA'] = PA_Hotel_AECF
FL_Hotel_AECF = decompress_pickle(
    "data/hotel/FL_Hotel_AECF.pbz2")
hotel_aecf_map['FL'] = FL_Hotel_AECF
TN_Hotel_AECF = decompress_pickle(
    "data/hotel/TN_Hotel_AECF.pbz2")
hotel_aecf_map['TN'] = TN_Hotel_AECF
IN_Hotel_AECF = decompress_pickle(
    "data/hotel/IN_Hotel_AECF.pbz2")
hotel_aecf_map['IN'] = IN_Hotel_AECF
MO_Hotel_AECF = decompress_pickle(
    "data/hotel/MO_Hotel_AECF.pbz2")
hotel_aecf_map['MO'] = MO_Hotel_AECF
LA_Hotel_AECF = decompress_pickle(
    "data/hotel/LA_Hotel_AECF.pbz2")
hotel_aecf_map['LA'] = LA_Hotel_AECF
AZ_Hotel_AECF = decompress_pickle(
    "data/hotel/AZ_Hotel_AECF.pbz2")
hotel_aecf_map['AZ'] = AZ_Hotel_AECF
NJ_Hotel_AECF = decompress_pickle(
    "data/hotel/NJ_Hotel_AECF.pbz2")
hotel_aecf_map['NJ'] = NJ_Hotel_AECF
NV_Hotel_AECF = decompress_pickle(
    "data/hotel/NV_Hotel_AECF.pbz2")
hotel_aecf_map['NV'] = NV_Hotel_AECF
AB_Hotel_AECF = decompress_pickle(
    "data/hotel/AB_Hotel_AECF.pbz2")
hotel_aecf_map['AB'] = AB_Hotel_AECF
print("Loading Hotel AECF Files Completed...")
print(datetime.datetime.now())
print("\n")

restaurent_aecf_map = {}
print("Loading Restaurent AECF Files...")
print(datetime.datetime.now())
PA_Restaurent_AECF = decompress_pickle(
    "data/restaurent/PA_Restaurent_AECF.pbz2")
restaurent_aecf_map['PA'] = PA_Restaurent_AECF
FL_Restaurent_AECF = decompress_pickle(
    "data/restaurent/FL_Restaurent_AECF.pbz2")
restaurent_aecf_map['FL'] = FL_Restaurent_AECF
TN_Restaurent_AECF = decompress_pickle(
    "data/restaurent/TN_Restaurent_AECF.pbz2")
restaurent_aecf_map['TN'] = TN_Restaurent_AECF
IN_Restaurent_AECF = decompress_pickle(
    "data/restaurent/IN_Restaurent_AECF.pbz2")
restaurent_aecf_map['IN'] = IN_Restaurent_AECF
MO_Restaurent_AECF = decompress_pickle(
    "data/restaurent/MO_Restaurent_AECF.pbz2")
restaurent_aecf_map['MO'] = MO_Restaurent_AECF
LA_Restaurent_AECF = decompress_pickle(
    "data/restaurent/LA_Restaurent_AECF.pbz2")
restaurent_aecf_map['LA'] = LA_Restaurent_AECF
AZ_Restaurent_AECF = decompress_pickle(
    "data/restaurent/AZ_Restaurent_AECF.pbz2")
restaurent_aecf_map['AZ'] = AZ_Restaurent_AECF
NJ_Restaurent_AECF = decompress_pickle(
    "data/restaurent/NJ_Restaurent_AECF.pbz2")
restaurent_aecf_map['NJ'] = NJ_Restaurent_AECF
NV_Restaurent_AECF = decompress_pickle(
    "data/restaurent/NV_Restaurent_AECF.pbz2")
restaurent_aecf_map['NV'] = NV_Restaurent_AECF
AB_Restaurent_AECF = decompress_pickle(
    "data/restaurent/AB_Restaurent_AECF.pbz2")
restaurent_aecf_map['AB'] = AB_Restaurent_AECF
print("Loading Restaurent AECF Files Completed...")
print(datetime.datetime.now())
print("\n")


# Write APIs here


@app.route('/profile')
@cross_origin()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<string:rec_type>/<string:state_name>/<int:user_id>/getNPR')
@cross_origin()
def getNPRRecommendation(rec_type, state_name, user_id):
    global hotel_state_rec_map
    global restaurent_state_rec_map
    rec = hotel_state_rec_map[state_name] if rec_type == "hotel" else restaurent_state_rec_map[state_name]
    business_list = rec.getNPRForuUser(user_id)
    return json.dumps(
        [{'name': business.name, 'address': business.address, 'city': business.city, 'state': business.state, 'postal_code': business.postal_code, 'stars': business.stars} for business in business_list])


@app.route('/<string:rec_type>/<string:state_name>/<int:user_id>/getMF')
@cross_origin()
def getMFRecommendation(rec_type, state_name, user_id):
    global hotel_mf_map
    global restaurent_mf_map
    global hotel_state_rec_map
    global restaurent_state_rec_map
    if rec_type == "hotel":
        mf_recommendations = hotel_mf_map[state_name]
    elif rec_type == "restaurent":
        mf_recommendations = restaurent_mf_map[state_name]
    recommendations_class = hotel_state_rec_map[
        state_name] if rec_type == "hotel" else restaurent_state_rec_map[state_name]

    business_ids = mf_recommendations[user_id][:12]

    business_list = []
    for i in range(12):
        business_hash = recommendations_class.getBusinessHashFromBusinessNum(
            business_ids[i])
        business = recommendations_class.getBusinessInfo(business_hash)
        business_list.append(business)

    return json.dumps(
        [{'name': business.name, 'address': business.address, 'city': business.city, 'state': business.state, 'postal_code': business.postal_code, 'stars': business.stars} for business in business_list])


@app.route('/<string:rec_type>/<string:state_name>/<int:user_id>/getAECF')
@cross_origin()
def getAECFRecommendation(rec_type, state_name, user_id):
    global hotel_aecf_map
    global restaurent_aecf_map
    global hotel_state_rec_map
    global restaurent_state_rec_map
    if rec_type == "hotel":
        aecf_recommendations = hotel_aecf_map[state_name]
        recommendations_class = hotel_state_rec_map[state_name]
    elif rec_type == "restaurent":
        aecf_recommendations = restaurent_aecf_map[state_name]
        recommendations_class = restaurent_state_rec_map[state_name]

    business_ids = aecf_recommendations.get_user_recommendation(user_id)
    print(business_ids)

    business_list = []
    for i in range(12):
        business_hash = recommendations_class.getBusinessHashFromBusinessNum(
            business_ids[i])
        business = recommendations_class.getBusinessInfo(business_hash)
        business_list.append(business)

    return json.dumps(
        [{'name': business.name, 'address': business.address, 'city': business.city, 'state': business.state, 'postal_code': business.postal_code, 'stars': business.stars} for business in business_list])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False)
