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
  let productsArray = []

  // get product from firebase
  products.onSnapshot(docs => {
    productsArray = [];
    docs.forEach(doc => {
      
      productsArray.push({product_id:doc.id, ...doc.data()})
        ui.paintUI(productsArray)
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
      


      // const products = {
      //   name: "Turmeric powder 100g",
      //   price: 90,
      //   quantity: 1500
      // }

      
    }

   
  }




  //search products
  function searchProducts(){
    const searchQuery = productSearchBar.value
    //get search result from firebase
    products.where("product_tags", "array-contains", searchQuery)
    .onSnapshot(docs => {
      docs.forEach(doc => {
        // console.log(doc.data(), searchQuery)
      })
    })

    // console.log(productSearchBar.value);
  }

  productSearchBar.addEventListener('keyup', searchProducts);
  addProductModalBtn.addEventListener("click", openAddProduct);
  productsTable.addEventListener("click", openViewProduct)

