class UI {
    constructor(){
        this.product_table = document.querySelector("#products-table tbody");
    }

    paintUI(data){
        console.log(data);
        const row = `
         <tr>
            <td>${data.Name}</td>
            <td>${data.Price}</td>
            <td>${data.Quantity}</td>
            <td>${data.Total_Amount}</td>
            <td><i class="fa fa-times" aria-hidden="true"></i></td>
        </tr>
        `
        this.product_table.innerHTML = row;
    }
}