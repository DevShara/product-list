class UI {
    constructor(){
        this.product_table = document.querySelector("#productsTable tbody");
        this.addProduct;
        this.data;
    }

    paintUI(products){
        // console.log(products)
        let tbody = '';
        products.forEach(item =>{
            tbody += `
         <tr data-id=${item.product_id}>
            <td><button type="button" class="btn viewProductModalBtn " data-toggle="modal" data-target="#theModal">${item.product_name}</button></td>
            <td>${item.product_price}</td>
            <td>${item.product_quantity}</td>
            <td>${item.product_price * item.product_quantity}</td>
            <td><i class="fa fa-times" aria-hidden="true"></i></td>
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
    
    
    
}