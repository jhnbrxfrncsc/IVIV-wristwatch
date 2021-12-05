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

const allProd = document.querySelector("#allProd");
const activeProd = document.querySelector("#activeProd");
const archiveProd = document.querySelector("#archiveProd");


adminProfile.classList.remove("nav-active");
adminProducts.classList.add("nav-active");
adminUsers.classList.remove("nav-active");
adminOrders.classList.remove("nav-active");

allProd.classList.add("nav-active");
activeProd.classList.remove("nav-active");
archiveProd.classList.remove("nav-active");


// Displaying Products
const prodsContainer = document.querySelector("#products-container");
fetch('https://iviv-wristwatch.herokuapp.com/admin/products-api')
    .then(res => res.json())
    .then(res => {
        if(res.products){
            if(res.products.length > 0) {
                const prodCard = res.products.map(({
                        _id,
                        productName,
                        productBrand,
                        productImage,
                        productPrice,
                        productDiscount,
                        isActive,
                    }) => {
                    let discounted;
                    let dPrice;
                    let discount = productPrice * productDiscount / 100;
                    const discountedPrice = productPrice - discount;
                    let active;
                    let archive;
                    if(isActive){
                        active = `<div class="product-card product-active">`
                        archive = `
                            <a 
                                href="blank?prodId=${_id}&productName=${productName}&method=archiving"
                                class="archive-btn"
                            >
                                Archive
                            </a>
                        `
                    } else {
                        active = `<div class="product-card product-archive">`
                        archive = `
                            <a 
                                href="blank?prodId=${_id}&productName=${productName}&method=deleteProd"
                                class="delete-btn"
                            >
                            <i class="fas fa-trash-alt"></i>
                            </a>
                            <a 
                                href="blank?prodId=${_id}&productName=${productName}&method=activating"
                                class="unarchive-btn"
                            >
                                Unarchive
                            </a>
                        `
                    }
                    if(productDiscount <= 0){
                        discounted = '';
                        dPrice = `
                            <span class="price">₱${thousands_separators(discountedPrice)}</span>
                        `
                    } else {
                        discounted = `
                            <span class="discount-tag">${productDiscount}% off</span>
                        `
                        dPrice = `
                            <span class="price">₱${thousands_separators(discountedPrice)}</span>
                            <span class="actual-price">₱${thousands_separators(productPrice)}</span>
                        `
                    }

                    return (
                        `
                        ${active}
                            <div class="product-image">
                                ${discounted}
                                <img 
                                    class="product-thumb"
                                    src="image/${productImage[0]}" 
                                    alt="${productImage[0]}"
                                >
                                <a 
                                    href="edit-product?prodId=${_id}"
                                    class="edit-btn"
                                >
                                    Edit
                                </a>
                                ${archive}
                            </div>
                            <div class="product-info">
                                <h2 class="product-brand">${productBrand}</h2>
                                <p class="product-desc">${productName}</p>
                                ${dPrice}
                            </div>
                        </div>
                        `
                    );
                });
                prodsContainer.innerHTML = prodCard.join(" ");
            } else {
                prodsContainer.innerHTML = `
                    <h1>No Products</h1>
                `
            }
        } 
    })

function thousands_separators(num){
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}