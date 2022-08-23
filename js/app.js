const firebaseConfig = {
    apiKey: "AIzaSyCQ9NyJtK2i6eFVucweVF5KszbuNCj0k7U",
    authDomain: "product-store-d83f7.firebaseapp.com",
    projectId: "product-store-d83f7",
    storageBucket: "product-store-d83f7.appspot.com",
    messagingSenderId: "822297401304",
    appId: "1:822297401304:web:d0b37d5c54992621eb44ad"
};

  //init app
  firebase.initializeApp(firebaseConfig);

  //init firestore
  const db = firebase.firestore();

  db.collection("products").get()
  .then((docs) => {
    docs.forEach(doc => {
        console.log(doc.data());
    })

  })
  .catch(err => {
    console.log(err);
  })