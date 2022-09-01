class UI {
    constructor(){
        this.product_table = document.querySelector("#productsTable tbody");
        this.addProduct;
        this.data;
        this.productSelect;
    }

    paintUI(products){
        // console.log(products)
        let tbody = '';
        products.forEach(item =>{
            tbody += `
         <tr data-id=${item.product_id}>
            <td><button type="button" class="btn viewProductModalBtn " data-toggle="modal" data-target="#theModal">${item.product_name}</button></td>
            <td class="align-middle">${item.product_price}</td>
            <td class="align-middle">${item.product_quantity}</td>
            <td class="align-middle">${item.product_price * item.product_quantity}</td>
            <td class="align-middle"><i class="fa fa-times" aria-hidden="true"></i></td>
        </tr>
        `
        })
      
        this.product_table.innerHTML = tbody;
    }

    openModal(template, view){ 
        // const data = {
        //     name : "Joe",
        //     age: 36,
        //     occupation : "Web Developer"  
        // }
        
           var output = Mustache.render(template, view);
           document.getElementById('modal-content').innerHTML = output;
   
    } 
    
    loadProducts (products){

        this.productSelect = document.querySelector('#productSelect');
        let select = ''; 
  
      products.forEach((product) => {
        const option = `<option value="${product.product_id}">${product.product_name}</option>`
        select += option;
      });
  
      productSelect.innerHTML = select;
    }
    
}