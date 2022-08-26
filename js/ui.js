class UI {
    constructor(){
        this.product_table = document.querySelector("#products-table tbody");
        this.addProduct;
        this.data;
    }

    paintUI(products){
        let tbody = '';
        products.forEach(item =>{
            tbody += `
         <tr>
            <td>${item.product_name}</td>
            <td>${item.product_price}</td>
            <td>${item.product_quantity}</td>
            <td>${item.product_price * item.product_quantity}</td>
            <td><i class="fa fa-times" aria-hidden="true"></i></td>
        </tr>
        `
        })
        
        this.product_table.innerHTML = tbody;
    }

    openModel(template){

        const data = {
            name : "Joe",
            age: 36,
            occupation : "Web Developer"  
        }
   
       
                   
           var output = Mustache.render(template, data);
           document.getElementById('modal-content').innerHTML = output;
   
         }
    
}