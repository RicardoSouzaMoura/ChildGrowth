import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('growth-child-firebase-adminsdk-3ke4g-1deef764a9.json')
firebase_admin.initialize_app(cred)

db = firestore.client()