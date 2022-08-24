class UI {
    constructor(){
        this.product_table = document.querySelector("#products-table tbody");
    }

    paintUI(data){
        console.log(data);
        const row = `
         <tr>
            <td>${data.product_name}</td>
            <td>${data.price}</td>
            <td>${data.quantity}</td>
            <td>${data.total_amount}</td>
            <td><i class="fa fa-times" aria-hidden="true"></i></td>
        </tr>
        `
        this.product_table.innerHTML = row;
    }
}