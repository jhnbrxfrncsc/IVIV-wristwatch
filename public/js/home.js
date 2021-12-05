const productContainers = document.querySelectorAll(".product-container");
const nxtBtn = document.querySelectorAll(".next-btn");
const prevBtn = document.querySelectorAll(".prev-btn");

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth - 3;
    });

    prevBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    });
})

const prodsContainer = document.querySelector(".product-container");

fetch(`https://iviv-wristwatch.herokuapp.com/admin/active-products-api`)
    .then(res => res.json())
    .then(res => {
        console.log(res.activeProducts);
        if(res.activeProducts){
            sessionStorage.setItem("activeProducts", res.activeProducts);
            if(res.activeProducts.length > 0) {
                const prodCard = res.activeProducts.sort((a,b) => a.orders.length < b.orders.length ? 1 : -1).map(({
                        _id,
                        productName,
                        productBrand,
                        productImage,
                        productPrice,
                        productDiscount
                    }, index) => {
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
                    if(index <= 6){
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
                                    </div>
                                </div>
                            `
                        );
                    }
                });
                prodsContainer.innerHTML = prodCard.join(" ");
            } else {
                prodsContainer.innerHTML = 
                `
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-1-1.jpeg" 
                                alt="Product-1"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">Gucci</h2>
                            <p class="product-desc">G-Timeless Leather Strap Watch</p>
                            <span class="price">₱2,500</span>
                            <span class="actual-price">₱4,500</span>
                        </div>
                    </div>

                    <!-- Product-2 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-2-1.jpg" 
                                alt="Product-2"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">MVMT</h2>
                            <p class="product-desc">THE TAFT X MVMT POWERLANE WATCH</p>
                            <span class="price">₱6,250</span>
                            <span class="actual-price">₱12,500</span>
                        </div>
                    </div>

                    <!-- Product-3 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-3-1.jpg" 
                                alt="Product-3"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">Panther Black</h2>
                            <p class="product-desc">LEGACY SLIM</p>
                            <span class="price">₱5,250</span>
                            <span class="actual-price">₱10,500</span>
                        </div>
                    </div>

                    <!-- Product-4 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-4-1.jpeg" 
                                alt="Product-4"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">Gucci</h2>
                            <p class="product-desc">Grip Bracelet Watch</p>
                            <span class="price">₱4,000</span>
                            <span class="actual-price">₱8,000</span>
                        </div>
                    </div>

                    <!-- Product-5 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-5-1.jpeg" 
                                alt="Product-5"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">VERSUS VERSACE</h2>
                            <p class="product-desc">Palos Verdes Mesh Strap Watch</p>
                            <span class="price">₱8,250</span>
                            <span class="actual-price">₱16,500</span>
                        </div>
                    </div>

                    <!-- Product-6 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-6-1.jpeg" 
                                alt="Product-6"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">DW</h2>
                            <p class="product-desc">'Classic Sheffield' Leather Strap Watch</p>
                            <span class="price">₱2,500</span>
                            <span class="actual-price">₱5,000</span>
                        </div>
                    </div>

                    <!-- Product-7 -->
                    <div class="product-card">
                        <div class="product-image">
                            <span class="discount-tag">50% off</span>
                            <img 
                                class="product-thumb"
                                src="img/product-7-1.jpeg" 
                                alt="Product-7"
                            >
                            <button class="card-btn">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">FOSSIL</h2>
                            <p class="product-desc">'Grant' Automatic Leather Strap Watch</p>
                            <span class="price">₱4,500</span>
                            <span class="actual-price">₱9,000</span>
                        </div>
                    </div>
                `
            }
        } 
    })


function thousands_separators(num){
    let num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}