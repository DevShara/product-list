//init class ui
const ui = new UI();

const productSearchBar = document.querySelector("#product-search-bar");


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

  const products = db.collection("products");

  // get product from firebase

  products.onSnapshot(docs => {
    if(docs.empty()){
      docs.forEach(doc => {
        ui.paintUI(doc.data());
      })
    }else{
      console.log('EMPTY!');
    }
    
  })



  //search products
  function searchProducts(){

    //get search result from firebase
    products.get()

    console.log(productSearchBar.value);
  }

  productSearchBar.addEventListener('keyup', searchProducts);
