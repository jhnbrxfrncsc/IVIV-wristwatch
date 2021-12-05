// PRODCUT IMAGES
const homeLink = document.querySelector("#home");
const shopLink = document.querySelector("#shop");
const aboutLink = document.querySelector("#about");
const contactLink = document.querySelector("#contact");
const titleHead = document.querySelector("title");


homeLink.classList.remove("nav-link-active");
shopLink.classList.add("nav-link-active");
aboutLink.classList.remove("nav-link-active");
contactLink.classList.remove("nav-link-active");

homeLink.classList.add("nav-link-not-active");
shopLink.classList.remove("nav-link-not-active");
aboutLink.classList.add("nav-link-not-active");
contactLink.classList.add("nav-link-not-active");


const params = new URLSearchParams(window.location.search);
const prodId = params.get("prodId");
const prodDetails = document.querySelector('.product-details');

function thousands_separators(num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;

fetch(`${url}admin/get-product/${prodId}`)
    .then(res => res.json())
    .then(res => {
        const {
            _id,
            productName,
            productBrand,
            productDesc,
            productPrice,
            productDiscount,
            productImage
        } = res.product;
        titleHead.innerHTML = `Product - ${productName}`
        const prodImages = productImage.map(prodImg => {
            return (`
                <img 
                    src="image/${prodImg}" 
                    alt="${prodImg}" 
                    class="product-photo"
                >
            `)
        })
        let price;
        let discount = productPrice * productDiscount / 100;
        let discountedPrice = productPrice - discount;

        if(productDiscount == 0) {
            price = `
                <span class="price">₱${thousands_separators(productPrice)}</span>
            `
        } else {
            price = `
                <span class="price">₱${thousands_separators(discountedPrice)}</span>
                <span class="actual-price">₱${thousands_separators(productPrice)}</span>
                <span class="price-off">(${productDiscount}% OFF)</span>
            `
        }

        prodDetails.innerHTML = `
            <article class="product-images">
                <div class="image-slider">
                    ${prodImages.join(" ")}
                </div>
                <div class="image-active">
                    <img 
                        src="image/${productImage[0]}" 
                        alt="product-thumb"
                        class="photo-thumb"
                    >
                </div>
            </article>
            <article class="product-desc">
                <h1>${productName}</h1>
                <h2>${productBrand}</h2>
                <p>
                    ${price}
                </p>
                <p class="desc">
                    ${productDesc}
                </p>
                <div class="product-actions">
                    <button class="add-to-cart">
                        <i class="fas fa-cart-plus"></i>
                        Add To Cart
                    </button>
                    <button class="add-to-wishlist">
                        <i class="fas fa-heart"></i>
                        Wishlist
                    </button>
                </div>
            </article>
        `
        const pictures = document.querySelectorAll('.product-photo');
        const thumbPic = document.querySelector('.photo-thumb');
        pictures.forEach(picture => {
            picture.addEventListener('click', (e) => {
                thumbPic.src = e.target.src;
            }) 
        });
        const cartBtn = document.querySelector(".add-to-cart");
        const wishBtn = document.querySelector(".add-to-wishlist");
        
        cartBtn.addEventListener('click', () => {
            let addCartItem;
            const user_id = localStorage.getItem("userId");
            if(productDiscount == 0){
                addCartItem = {
                    userId: user_id,
                    productName,
                    productBrand,
                    productPrice,
                    productImage: productImage[0],
                    qty: 1
                }
            } else {
                addCartItem = {
                    userId: user_id,
                    productName,
                    productBrand,
                    productPrice: discountedPrice,
                    productImage: productImage[0],
                    qty: 1
                }
            }
            cartBtn.innerHTML = "Added";
            setTimeout(() => {
            cartBtn.innerHTML = "Add to cart";
            }, 3000);
            if(user_id){
                fetch(`${url}add-cart-item`, { 
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
            
        })

        const productContainers = document.querySelectorAll(".product-container");
        const prodsContainer = document.querySelector(".product-container");
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
        fetch(`${url}admin/active-products-api`)
            .then(res => res.json())
            .then(res => {
                if(res.activeProducts){
                    if(res.activeProducts.length > 0) {
                        const prodCard = res.activeProducts.filter(prod => prod._id !== prodId).map(({
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
                                    <span class="price-2">₱${discountedPrice}</span>
                                `
                            } else {
                                discounted = `
                                    <span class="discount-tag-2">${productDiscount}% off</span>
                                `
                                dPrice = `
                                    <span class="price-2">₱${discountedPrice}</span>
                                    <span class="actual-price-2">₱${productPrice}</span>
                                `
                            }
                            if(index <= 6){
                                return (
                                    `
                                        <div class="product-card-2">
                                            <div class="product-image-2">
                                                <a href="product?prodId=${_id}">
                                                    ${discounted}
                                                    <img 
                                                        class="product-thumb-2"
                                                        src="image/${productImage[0]}" 
                                                        alt="${productImage[0]}"
                                                    >
                                                </a>
                                        </div>
                                            <div class="product-info-2">
                                                <h2 class="product-brand-2">${productBrand}</h2>
                                                <p class="product-desc-2">${productName}</p>
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
    })