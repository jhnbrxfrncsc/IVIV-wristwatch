const userId = localStorage.getItem("userId");
const cartContainer = document.querySelector(".cart");
const checkOutBox = document.querySelector(".checkout-box");
const checkOutBtn = document.querySelector(".checkout-btn");
const bill = document.querySelector(".bill");
if(!userId){
    checkOutBox.innerHTML = ` 
        <h1>Please Login.</h1> 
        <br><br>
        <a href="/login" class="checkout-btn">
            Login
        </a>
        <br><br>
    `;
}

const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;

fetch(`${url}get-cart-items/${userId}`)
    .then(res => res.json())
    .then(res => {
        if(res.bool){
            let cartItemsCard;
            let totalBill = [];
            if(res.cartItems.length > 0) {
                cartItemsCard = res.cartItems.map(cartItem => {
                    let totalProdPrice = cartItem.productPrice * cartItem.qty;
                    totalBill.push(totalProdPrice);
                    return(`
                        <div class="sm-product">
                            <img 
                                src="image/${cartItem.productImage}" 
                                alt="${cartItem.productImage}" 
                                class="sm-product-img"
                            >
                            <div class="sm-text">
                                <p class="sm-product-name">
                                    ${cartItem.productBrand}
                                </p>
                                <p class="sm-des">
                                    ${cartItem.productName}
                                </p>
                            </div>
                            <div class="item-counter">
                                <button 
                                    class="counter-btn decrement"
                                    onclick="decrementQty(${cartItem.qty}, '${cartItem.productName}', '${cartItem.productBrand}')"
                                >
                                    -
                                </button>
                                <p class="item-count">${cartItem.qty}</p>
                                <button 
                                    class="counter-btn increment" 
                                    onclick="incrementQty(${cartItem.qty}, '${cartItem.productName}', '${cartItem.productBrand}')"
                                >
                                    +
                                </button>
                            </div>
                            <p class="sm-price">₱${thousands_separators(totalProdPrice)}</p>
                            <a 
                                href="admin/blank?cartId=${cartItem._id}&method=deleteCartItem&prodName=${cartItem.productName}"
                                class="sm-delete-btn"
                            >
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                    `)
                })
            } else if(res.cartItems.length === 0) {
                cartItemsCard = `<h1>Your cart is Empty.</h1> <br><br><br><br>`
                cartContainer.innerHTML = cartItemsCard;
            } 
            cartContainer.innerHTML = cartItemsCard.join(" ");
            totalBill = totalBill.reduce((a,b) => a+b);
            bill.innerHTML = `₱${thousands_separators(totalBill)}`;
            const addOrder = res.cartItems.map(({ productName, productBrand, qty}) => {
                const newOrder = { productName, productBrand, qty }
                return newOrder;
            })
            checkOutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const email = localStorage.getItem("email");
                const newOrder = {
                    userId,
                    email,
                    products: addOrder, 
                    totalAmount: totalBill,
                    purchaseDate: new Date().toISOString().split('T')[0]
                }
                fetch(`https://iviv-wristwatch.herokuapp.com/orders/add-order`, { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newOrder)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if(res.bool) {
                            alert(res.message);
                            window.location.replace('/cart');
                        }
                    })
                console.log();
            })
        } else {
            alert(res.message);
        }
    })

function thousands_separators(num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}



const incrementQty = (qty, productName, productBrand) => {
    if(qty < 50){
        fetch(`${url}add-cart-item`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, qty, productName, productBrand, act: "inc"})
        })
            .then(res => res.json())
            .then(res => {
                if(res.bool){
                    window.location.replace("/cart");
                } else {
                    alert(res.message)
                }
            })
    } 
}

const decrementQty = (qty, productName, productBrand) => {
    console.log(qty);
    if(qty > 1){
        fetch(`${url}add-cart-item`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId, qty, productName, productBrand, act: "dec"})
        })
            .then(res => res.json())
            .then(res => {
                if(res.bool){
                    window.location.replace("/cart");
                } else {
                    alert(res.message)
                }
            })
    }
}

