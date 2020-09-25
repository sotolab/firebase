// https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ko
// https://medium.com/@savinihemachandra/creating-rest-api-using-express-on-cloud-functions-for-firebase-53f33f22979c
// https://lightcode.tistory.com/4
// https://gist.github.com/federicofazzeri/87fca43929e31a9df24245331735d602
// https://github.com/firebase/functions-samples/blob/9530537630c8be1ae752589d9f95763601852547/quickstarts/time-server/functions/index.js
// https://github.com/Jorgexyx/Firestore-nodejs-example/blob/master/addDocumentToCollection.js
// https://github.com/zaszab/cloud-firestore-nodejs/blob/master/index.js

const functions = require('firebase-functions');
const express = require('express');
var admin = require("firebase-admin");
var serviceAccount = require("./myfirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firebase.firebaseio.com"
});

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  db.collection("cities").add({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
    .then(function () {
      console.log("Document successfully written!");
      response.send("Hello from Firebase!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
});

exports.tokenWorld = functions.https.onRequest((request, response) => {
  let userId = 'some-uid';
  let additionalClaims = {
    premiumAccount: true
  };

  admin.auth().createCustomToken(userId, additionalClaims)
    .then(function (customToken) {
      // Send token back to client
      console.log("customToken : ", customToken);
      response.send("tokenWorld from Firebase!");
    })
    .catch(function (error) {
      console.log('Error creating custom token:', error);
      response.send("tokenWorld from Firebase!");
    });
});

exports.postWorld = functions.https.onRequest((request, response) => {
  // console.log(request);
  console.log("request.method : ", request.method);
  if (request.method === "POST") {
    console.log(request.method);
  }

  response.send("postWorld from Firebase!");
});
