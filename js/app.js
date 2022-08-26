//init class ui
const ui = new UI();

const productSearchBar = document.querySelector("#product-search-bar");
const addProductModalBtn = document.querySelector("#addProductModalBtn");



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
    const products = []
    docs.forEach(doc => {
        products.push(doc.data())
        ui.paintUI(products)
    })
  });

  



  //Open add product modal
  function openAddProduct(){
    ui.openModel(modals.addProduct);
    let addProductBtn = document.querySelector("#addProductBtn");
    let addProductForm = document.querySelector("#addProductForm");

    //Add product
    function addProduct(){
        const product = {}

        product.product_name = addProductForm.product_name.value;
        product.product_price = addProductForm.product_price.value;
        product.product_quantity = parseInt(addProductForm.product_quantity.value);

        //Add data to products table in Firebase
        products.add(product);
        console.log(product)

        
    }

    addProductBtn.addEventListener("click", addProduct);
 
  }




  //search products
  function searchProducts(){
    const searchQuery = productSearchBar.value
    //get search result from firebase
    products.where("product_tags", "array-contains", searchQuery)
    .onSnapshot(docs => {
      docs.forEach(doc => {
        console.log(doc.data(), searchQuery)
      })
    })

    // console.log(productSearchBar.value);
  }

  productSearchBar.addEventListener('keyup', searchProducts);
  addProductModalBtn.addEventListener("click", openAddProduct);
  

