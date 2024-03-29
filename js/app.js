//init class ui
const ui = new UI();

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
  getProducts();

  const productSearchBar = document.querySelector("#product-search-bar");
  const addProductModalBtn = document.querySelector("#addProductModalBtn");
  const viewProductModalBtn = document.querySelector(".viewProductModalBtn");
  const productsTable = document.querySelector("#productsTable");
  const saleBtn = document.querySelector("#saleBtn");
  const purchaseBtn = document.querySelector("#purchaseBtn");

  
  //Open add product modal
  function openAddProduct(){

    ui.openModal(modals.addProduct);
    let addProductBtn = document.querySelector("#addProductBtn");
    let addProductForm = document.querySelector("#addProductForm");

    
      //Add product
      addProductBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const productName = addProductForm.product_name.value;
        const productPrice = addProductForm.product_price.value;
        const productQuantity = addProductForm.product_quantity.value;

        if(productName.length > 0 && productPrice.length > 0 && productQuantity.length > 0){
          
          const product = {}

          product.product_name = addProductForm.product_name.value.toLowerCase();
          product.product_price = addProductForm.product_price.value;
          product.product_quantity = parseInt(addProductForm.product_quantity.value);
          product.product_tags = addProductForm.product_name.value.toLowerCase().split(" ")
  
          //Add data to products table in Firebase
          products.add(product); 

          addProductBtn.setAttribute("data-dismiss", "modal")
         

        }else{
          ui.modalMessage("Please fill all the fields")
        }
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


  //remove products
  function removeProducts(e){
   
    if(e.target.classList.contains('fa-times')){
      // const prompt = prompt("Are you sure?");
      if(confirm('Product will be permanently deleted')){
        const productId = e.target.parentElement.parentElement.dataset.id;
        products.doc(productId).delete()
        .then(() => {
          console.log('Succesfully deleted');
        })
      }
    }
  }


  //Open new sale modal
  function openMakeSale(){
    ui.openModal(modals.makeSale, productsArray);

    const productSelect = document.querySelector('#productSelect');
    const makeSaleBtn = document.querySelector('#makeSaleBtn');
    const saleQtyInput =  document.querySelector('#product_quantity');

    //Load product to select tag
    ui.loadProducts(productsArray);

    //Make sale
    makeSaleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedProductName = productSelect.value;
      let currentQty;
      const saleQty = saleQtyInput.value;
      let newQty;

      productsArray.forEach(product => {
        if(selectedProductName === product.product_id){
          currentQty = product.product_quantity;
        }
      });

      if(selectedProductName && saleQty.length > 0){

        if(currentQty >= saleQty){
          newQty = currentQty - saleQty;

          products.doc(selectedProductName).update({
            product_quantity: newQty
          });

          console.log(newQty);
          makeSaleBtn.setAttribute("data-dismiss", "modal")
        }else{
          console.log('Product stock balance is not sufficient');
          ui.modalMessage('Product stock balance is not sufficient');

        }
        
      }else{
        ui.modalMessage('Please fill all the fields');
      }
    })  
  }


    //Open new purchase modal
    function openMakePurchase(){
      ui.openModal(modals.makePurchase, productsArray);
  
      const productSelect = document.querySelector('#productSelect');
      const makePurchaseBtn = document.querySelector('#makePurchaseBtn');
      const purchaseQtyInput =  document.querySelector('#pur_product_quantity');
  
      //Load product to select tag
      ui.loadProducts(productsArray);
  
      //Make sale
      makePurchaseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedProductName = productSelect.value;
        let currentQty;
        const purchaseQty = parseInt(purchaseQtyInput.value);
        let newQty;
  
        productsArray.forEach(product => {
          if(selectedProductName === product.product_id){
            currentQty = product.product_quantity;
          }
        });
  
        if(selectedProductName && purchaseQty){
  
          if(purchaseQty < 10000){
            newQty = currentQty + purchaseQty;
  
            products.doc(selectedProductName).update({
              product_quantity: newQty
            });
  
            console.log(newQty);
            makePurchaseBtn.setAttribute("data-dismiss", "modal")
          }else{
            ui.modalMessage('Maxiumum purchase limit is 10000');
  
          }
          
        }else{
          ui.modalMessage('Please fill all the fields');
        }
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

  //clear modal using jquery
  ui.closeModal();

  productSearchBar.addEventListener('keyup', searchProducts);
  addProductModalBtn.addEventListener("click", openAddProduct);
  productsTable.addEventListener("click", openViewProduct);
  productsTable.addEventListener('click', removeProducts);
  saleBtn.addEventListener("click", openMakeSale);
  purchaseBtn.addEventListener("click", openMakePurchase);



