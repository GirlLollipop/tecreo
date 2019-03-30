// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1fVNeNeKfnzj84DehtBZvdSeihpuWuww",
    authDomain: "laboratorians-d5695.firebaseapp.com",
    databaseURL: "https://laboratorians-d5695.firebaseio.com",
    projectId: "laboratorians-d5695",
    storageBucket: "laboratorians-d5695.appspot.com",
    messagingSenderId: "273598035304"
  };
  firebase.initializeApp(config);
  let database = firebase.database();
  
  var db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  