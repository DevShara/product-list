//init class ui
const ui = new UI();

const productSearchBar = document.querySelector("#product-search-bar");
const addProductModalBtn = document.querySelector("#addProductModalBtn");
const viewProductModalBtn = document.querySelector(".viewProductModalBtn");
const productsTable = document.querySelector("#productsTable");
const saleBtn = document.querySelector("#saleBtn");



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

    ui.openModal(modals.addProduct);
    let addProductBtn = document.querySelector("#addProductBtn");
    let addProductForm = document.querySelector("#addProductForm");

    //Add product
    addProductBtn.addEventListener("click", () => {
      const product = {}

      product.product_name = addProductForm.product_name.value.toLowerCase();
      product.product_price = addProductForm.product_price.value;
      product.product_quantity = parseInt(addProductForm.product_quantity.value);
      product.product_tags = addProductForm.product_name.value.toLowerCase().split(" ")

      //Add data to products table in Firebase
      products.add(product); 

    });

  }


  //Open view product modal
  function openViewProduct(e){
    
    const target = e.target

    if(target.classList.contains("viewProductModalBtn")){

      const rowId = target.parentElement.parentElement.dataset.id;

      productsArray.forEach(product => {
        if(product.product_id === rowId){
          ui.openModal(modals.viewProduct, product);
        }
      })
    }
  }


  
  


  //Open new sale modal
  function openMakeSale(){
    ui.openModal(modals.makeSale, productsArray);

    const makeSaleBtn = document.querySelector('#makeSaleBtn');
    
    //Load product to select tag
    ( () => {

      const productSelect = document.querySelector('#productSelect');
      let select = ''; 
  
      productsArray.forEach((product) => {
        const option = `<option value=${product.product_id}>${product.product_name}</option>`
        select += option;
      });
  
      productSelect.innerHTML = select;

    } )();


    //Make sale
    makeSaleBtn.addEventListener('click', () => {
      
    })


    
  }


  //search products
  function searchProducts(){
    const searchQuery = productSearchBar.value.toLowerCase()
    //get search result from firebase

    if(searchQuery.length > 0){
      console.log("NOT EMPTY")
      products.where("product_tags", "array-contains", searchQuery)
      .onSnapshot(snapshot => {

        filteredArray = [];

        if(snapshot.docs.length > 0){
          snapshot.forEach(doc =>{
            filteredArray.push({product_id:doc.id, ...doc.data()});
            ui.paintUI(filteredArray)
          })

        }else{
          getProducts();
        }
      })

    }else{
      getProducts()

    }


  }//searchProducts()


  //clear modal
  // function clearModal(){
  //   const modal = document.getElementById('modal-content');
    
  //   if(modal.innerHTML !== ''){
  //     setTimeout(() => {
        
  //     }, 1000)
      
  //   }
  // }

  //clear modal using jquery
  $('#theModal').on('hidden.bs.modal', function () {
    const modal = document.getElementById('modal-content');
    modal.innerHTML = '';
});

  getProducts();
  productSearchBar.addEventListener('keyup', searchProducts);
  addProductModalBtn.addEventListener("click", openAddProduct);
  productsTable.addEventListener("click", openViewProduct);
  saleBtn.addEventListener("click", openMakeSale)

