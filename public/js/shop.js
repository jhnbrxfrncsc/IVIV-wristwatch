const homeLink = document.querySelector("#home");
const shopLink = document.querySelector("#shop");
const aboutLink = document.querySelector("#about");
const contactLink = document.querySelector("#contact");

homeLink.classList.remove("nav-link-active");
shopLink.classList.add("nav-link-active");
aboutLink.classList.remove("nav-link-active");
contactLink.classList.remove("nav-link-active");

homeLink.classList.add("nav-link-not-active");
shopLink.classList.remove("nav-link-not-active");
aboutLink.classList.add("nav-link-not-active");
contactLink.classList.add("nav-link-not-active");

const user_id = localStorage.getItem("userId");

const prodsContainer = document.querySelector(".product-container");

fetch(`http://localhost:5000/admin/active-products-api`)
    .then(res => res.json())
    .then(res => {
        if(res.activeProducts){
            if(res.activeProducts.length > 0) {
                const prodCard = res.activeProducts.map(({
                        _id,
                        productName,
                        productBrand,
                        productImage,
                        productPrice,
                        productDiscount
                    }) => {
                    let discount = productPrice * productDiscount / 100;
                    const discountedPrice = productPrice - discount;
                    let discounted;
                    let dPrice;
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

                    
                    let prodPrice = productDiscount == 0 ? productPrice : discountedPrice;

                    return (
                        `
                            <div class="product-card">
                                <div class="product-image">
                                    <a href="product?prodId=${_id}">
                                        ${discounted}
                                        <img 
                                            class="product-thumb"
                                            src="image/${productImage[0]}" 
                                            alt="${productImage[0]}"
                                        >
                                    </a>
                                </div>
                                <div class="product-info">
                                    <h2 class="product-brand">${productBrand}</h2>
                                    <p class="product-desc">${productName}</p>
                                    ${dPrice}
                                    <div class="product-actions">
                                        <button class="wish-btn">
                                            <i class="fas fa-heart"></i>
                                            add to wishlist
                                        </button>
                                        <button class="cart-btn" onclick="addToCart('${productName}', '${productBrand}', ${prodPrice}, '${productImage[0]}', 1)">
                                            <i class="fas fa-cart-plus"></i>
                                            add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `
                    );
                });
                prodsContainer.innerHTML = prodCard.join(" ");
            } else {
                prodsContainer.innerHTML = 
                `
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

const addToCart = (pName, pBrand, pPrice, pImg, qty) => {
    let addCartItem = {
        userId: user_id,
        productName: pName,
        productBrand: pBrand,
        productPrice: pPrice,
        productImage: pImg,
        qty
    };
    if(user_id){
        fetch(`http://localhost:5000/add-cart-item`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addCartItem)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message);
            })
    } else {
        alert("Please Login/Register");
        window.location.replace("/login");
    }
}
