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
                        <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <h1>{{name}}</h1>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Add Product</button>
                    </div>
                    `
    

}

