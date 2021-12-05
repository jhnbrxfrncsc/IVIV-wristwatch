const issAdmin = localStorage.getItem("isAdmin");
window.onload = () => {
    if(issAdmin === "false" || !issAdmin){
        alert("Only Authorized users can access this page. Redirecting you to homepage");
        window.location.replace('/');
    }
}

const adminProfile = document.querySelector("#profile");
const adminProducts = document.querySelector("#products");
const adminUsers = document.querySelector("#users");
const adminOrders = document.querySelector("#orders");


adminProfile.classList.add("nav-active");
adminProducts.classList.remove("nav-active");
adminUsers.classList.remove("nav-active");
adminOrders.classList.remove("nav-active");


