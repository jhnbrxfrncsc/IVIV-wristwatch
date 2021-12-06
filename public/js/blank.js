const issAdmin = localStorage.getItem("isAdmin");
window.onload = () => {
    if(!issAdmin){
        alert("Only Authorized users can access this page. Redirecting you to homepage");
        window.location.replace('/');
    }
}

const message = document.querySelector(".message");

// URL PARAMS
const params = new URLSearchParams(window.location.search);
const method = params.get("method");

// Products
const prodId = params.get("prodId");
const productName = params.get("productName");

// Users
const userId = params.get("userId");
const email = params.get("email");

// Cart
const user_id = localStorage.getItem("userId");
const cartId = params.get("cartId");
const prodName = params.get("prodName");

const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;


// Methods
if(method === "archiving" || method === "activating"){
    message.innerHTML = `${method} ${productName}`;
    fetch(`${url}admin/active-archive/${prodId}`, { method: "PUT" })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            window.location.replace("/admin/products");
        })
} else if(method === "deleteProd") {
        message.innerHTML = `Deleting ${productName}`;
        fetch(`${url}admin/delete-product/${prodId}`, { method: "DELETE" })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                window.location.replace("/admin/products");
            })
} else if(method === "deleteUser") {
    message.innerHTML = `Deleting ${email}`;
    fetch(`${url}delete-user/${userId}`, { method: "DELETE" })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            window.location.replace("/admin/users");
        })
} else if(method === "deleteCartItem"){
    message.innerHTML = `Removing Cart Item: ${prodName}`;
    fetch(`${url}remove-cart-item/${user_id}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prodName })
    })
        .then(res => res.json())
        .then(res => {
            alert(res.message);
            window.location.replace("/cart");
        })
}
