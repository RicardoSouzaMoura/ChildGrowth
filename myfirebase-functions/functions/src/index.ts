import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
//import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

//const firestore = new Firestore();
//const settings = {/* your settings... */ timestampsInSnapshots: true};
//firestore.settings(settings);

const db = admin.firestore();
const bmiForAge = db.collection("bmiForAge");


//var bmis = bmiForAge.get().then(doc =>{
//    console.log("aqui then: "+JSON.stringify(doc));
//});
//console.log("aqui: "+JSON.stringify(bmis));
const app = express();

// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(app);

app.get('/api/v1/bmiForAge', (req, res) => {
    bmiForAge.where('month', '>=', '0')
         .where('month', '<=', '60')
         .where('gender', '==', 'b')
         .get()
         .then((snapshot) => {
            let arrayDoc = [];
            snapshot.forEach((doc) => {
              console.log(doc.id, '=>', doc.data());
              arrayDoc.push(doc.data());
            });
            res.send('teste 3: '+ JSON.stringify(arrayDoc));
          })
          .catch((err) => {
            console.log('Error getting documents', err);
            res.statusMessage = 'Error getting documents'+ err;
            res.sendStatus(500);
          });
})