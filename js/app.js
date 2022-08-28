//init class ui
const ui = new UI();

const productSearchBar = document.querySelector("#product-search-bar");
const addProductModalBtn = document.querySelector("#addProductModalBtn");
const viewProductModalBtn = document.querySelector(".viewProductModalBtn");
const productsTable = document.querySelector("#productsTable");



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
  let productsArray = [];
  let filteredArray = [];

  // get product from firebase
  function getProducts(){
    products.onSnapshot(docs => {
      productsArray = [];
      docs.forEach(doc => {
        
        productsArray.push({product_id:doc.id, ...doc.data()})
          ui.paintUI(productsArray)
      })
    });
  }


  //Open add product modal
  function openAddProduct(){

    ui.openModel(modals.addProduct);
    let addProductBtn = document.querySelector("#addProductBtn");
    let addProductForm = document.querySelector("#addProductForm");

    //Add product
    function addProduct(){
        const product = {}

        product.product_name = addProductForm.product_name.value.toLowerCase();
        product.product_price = addProductForm.product_price.value;
        product.product_quantity = parseInt(addProductForm.product_quantity.value);
        product.product_tags = addProductForm.product_name.value.toLowerCase().split(" ")

        //Add data to products table in Firebase
        products.add(product);
  
        
    }

    addProductBtn.addEventListener("click", addProduct);
 
  }


  //Open view product modal
  function openViewProduct(e){

    const target = e.target

    if(target.classList.contains("viewProductModalBtn")){

      const rowId = target.parentElement.parentElement.dataset.id;
    
      // console.log(productsArray)
      // console.log(productRows)

      productsArray.forEach(product => {
        if(product.product_id === rowId){
          ui.openModel(modals.viewProduct, product);
        }

      })

    }
  
  }


  //search products
  function searchProducts(){
    const searchQuery = productSearchBar.value.toLowerCase()
    //get search result from firebase

    if(searchQuery.length === 0){
      getProducts();
    }else{
      products.where("product_tags", "array-contains", "powder")
      .get()
      .then(snapshot => {
        console.log(snapshot.docs.length )
        snapshot.forEach(docs => {
          productsArray = docs.data()
        
        })
      })

      // .onSnapshot(docs => {
      //   productsArray = [];
      //   console.log(docs.length)
      //   docs.forEach((doc) => { 
      //     // console.log(doc, arr)       
      //       filteredArray.push({product_id:doc.id, ...doc.data()})
      //       ui.paintUI(filteredArray)

      //   }) 
      // })
    }


    // console.log(productSearchBar.value);
  }

  getProducts();
  productSearchBar.addEventListener('keyup', searchProducts);
  addProductModalBtn.addEventListener("click", openAddProduct);
  productsTable.addEventListener("click", openViewProduct)

