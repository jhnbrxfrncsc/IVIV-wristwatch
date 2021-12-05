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
adminProfile.classList.remove("nav-active");
adminProducts.classList.add("nav-active");
adminUsers.classList.remove("nav-active");


const showAlert = (msg) => {
    let alertBox = document.querySelector(".alert-box");
    let alertMsg = document.querySelector(".alert-msg");

    alertMsg.innerHTML = `
        <div class="alert-box">
            <i class="fas fa-times-square alert-icon"></i>
            <p class="alert-msg">
                ${msg}
            </p>
        </div>
    `;
    alertBox.classList.add("show-alert");
    setTimeout(() => {
        alertBox.classList.remove("show-alert");
    }, 3500)
}


// Price
const productPrice = document.querySelector("#price");
const productDiscount = document.querySelector("#discount");
const productDiscountedPrice = document.querySelector("#discounted-price");

productDiscount.addEventListener("input", () => {
    if(productDiscount.value > 99){
        productDiscount.value = 99;
    } else if(productDiscount.value < 0) {
        productDiscount.value = 0;
    } else {
        let discount = productPrice.value * productDiscount.value / 100;
        productDiscountedPrice.value = productPrice.value - discount;
    }
});

productPrice.addEventListener("input", () => {
    if(productDiscount.value > 99){
        productDiscount.value = 99;
    } else if(productDiscount.value < 0) {
        productDiscount.value = 0;
    } else {
        let discount = productPrice.value * productDiscount.value / 100;
        productDiscounted = productPrice.value - discount;
    }
});


// Posting new product
const newProdForm = document.querySelector('#add-product-form');
const productName = document.querySelector('#product-name');
const productBrand = document.querySelector('#product-brand');
const productDesc = document.querySelector('#product-desc');

const url = `https://iviv-wristwatch.herokuapp.com/admin/add-product`;
// const url = `http://localhost:5000/admin/add-product`

// ADD PRODUCT
newProdForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        productName: productName.value,
        productBrand: productBrand.value,
        productDesc: productDesc.value,
        productPrice: productPrice.value,
        productDiscount: productDiscount.value === '' ? 0 : productDiscount.value
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(res => res.json())
        .then(res => {
            if(res.bool) {
                alert(res.message);
                localStorage.setItem("productId", res.result._id);
                window.location.replace("/admin/product-upload");
            } else if(!res.bool) {
                alert(res.message);
            }
        });
});
