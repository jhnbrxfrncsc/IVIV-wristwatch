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
const editProdForm = document.querySelector('#edit-product-form');
const productName = document.querySelector('#product-name');
const productBrand = document.querySelector('#product-brand');
const productDesc = document.querySelector('#product-desc');
const productPrice = document.querySelector("#price");
const productDiscount = document.querySelector("#discount");
const productDiscountedPrice = document.querySelector("#discounted-price");

const params = new URLSearchParams(window.location.search);
const prodId = params.get("prodId");

const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;

fetch(`${url}admin/get-product/${prodId}`)
    .then(res => res.json())
    .then(res => {
        if(res.bool) {
            productName.value = res.product.productName;
            productBrand.value = res.product.productBrand;
            productDesc.value = res.product.productDesc;
            productPrice.value = res.product.productPrice;
            productDiscount.value = res.product.productDiscount;

            let discount = res.product.productPrice * res.product.productDiscount / 100;
            productDiscountedPrice.value = res.product.productPrice - discount;

            editProdForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const editedProduct = {
                    productName: productName.value,
                    productBrand: productBrand.value,
                    productDesc: productDesc.value,
                    productPrice: productPrice.value,
                    productDiscount: productDiscount.value
                };
                fetch(`${url}admin/product-edit/${res.product._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(editedProduct)
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res.bool) {
                            alert(res.message);
                            window.location.replace(`/admin/product-upload`);
                        } else if(!res.bool) {
                            alert(res.message);
                        }
                    });
            });
        }
    });

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
        productDiscountedPrice.value = productPrice.value - discount;
    }
});