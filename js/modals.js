

const modals = {

    addProduct: `  <div class="modal-header">
                               <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                               </button>
                             </div>
                             
                             <div class="modal-body">
                               <form id="addProductForm">
                                 <div class="form-group">
                                   <label for="product_name">Product Name</label>
                                   <input type="text" class="form-control" id="product_name" placeholder="Product Name">  
                                 </div>
                                 <div class="form-group">
                                   <label for="product_price">Product Price</label>
                                   <input type="text" class="form-control" id="product_price" placeholder="Product Price">  
                                 </div>
                                 <div class="form-group">
                                   <label for="product_quantity">Product Quantity</label>
                                   <input type="text" class="form-control" id="product_quantity" placeholder="Product Quantity">  
                                 </div>          
                               </form>
                             </div>
   
                             <div class="modal-footer">
                               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                               <button type="button" class="btn btn-primary" id="addProductBtn" data-dismiss="modal">Add Product</button>
                             </div>
                             `,
    viewProduct: `  <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{product_name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price:{{product_price}}</li>
                        <li class="list-group-item">Quantity:{{product_quantity}}</li>
                        <li class="list-group-item">Total Amount:{{product_price}}</li>
                      </ul>
                    </div>
                    `,
    makeSale: `  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Make New Sale</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Preference</label>
                      <select class="custom-select" id="productSelect"></select>
                    </div>

                    <div class="form-group">
                      <label for="product_quantity">Product Quantity</label>
                      <input type="text" class="form-control" id="product_quantity" placeholder="Product Quantity">  
                   </div> 
                 
                
                     <button type="submit" class="btn btn-primary my-1" id="makeSaleBtn">Make Sale</button>
                </form>
                </div>
                `
    

}


function generate(){
      
  let select = ''; 

  productsArray.forEach((product) => {
    const option = document.createElement('select');
    option.innerText = product.product_name;

    select += option;
  })

  return select;
}

