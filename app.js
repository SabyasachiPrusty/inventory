function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

fetch("/api/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})
.then(res=>res.json())
.then(data=>{

if(data.success){

localStorage.setItem("user",JSON.stringify(data.user));

window.location="dashboard.html";

}else{

alert("Invalid Login");

}

});

}
function addProduct(){

const name = document.getElementById("name").value;
const price = document.getElementById("price").value;
const quantity = document.getElementById("quantity").value;

fetch("/api/products/add",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,price,quantity})
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
loadProducts();
});

}

function loadProducts(){

fetch("/api/products")
.then(res=>res.json())
.then(products=>{

let table=document.getElementById("productTable");

table.innerHTML=`
<tr>
<th>ID</th>
<th>Name</th>
<th>Price</th>
<th>Qty</th>
<th>Action</th>
</tr>
`;

products.forEach(p=>{

table.innerHTML+=`
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.price}</td>
<td>${p.quantity}</td>
<td> 
<button class="action-btn" onclick="editProduct(${p.id})">Edit</button>
<button class="action-btn" onclick="deleteProduct(${p.id})">Delete</button>
</td>
</tr>
`;

});

});

}

function deleteProduct(id){

fetch("/api/products/"+id,{
method:"DELETE"
})
.then(res=>res.json())
.then(data=>{
alert(data.message);
loadProducts();
});

}

function editProduct(id) {
    const name = prompt("Enter new name");
    const price = prompt("Enter new price");
    const quantity = prompt("Enter new quantity");

    fetch(`/api/products/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, quantity })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
    });
}

loadProducts();

function billProduct() {

    const product_id = document.getElementById("product_id").value;
    const quantity = document.getElementById("quantity").value;

    fetch("/bill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ product_id, quantity })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    });

function cancelInvoice(){
    window.location.href = "billing.html";
}    

}