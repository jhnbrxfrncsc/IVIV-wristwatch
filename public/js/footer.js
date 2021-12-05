const isAdmin = localStorage.getItem("isAdmin");

const createFooter = () => {
    let footer = document.querySelector('footer');

    let user;
    if(!isAdmin) {
        user = `<a href="/login"> Login / Register </a>`
    } else if(isAdmin === "true") {
        user = `<a href="/admin/profile"> Admin Homepage </a>`
    } else if (isAdmin === "false"){
        user = `<a href="/profile"> My Account </a>`
    }
    footer.innerHTML = `
        <section class="sub-1">
            <!-- Company Links -->
            <div class="footer-links">
                <h1>Company</h1>
                <h3>
                    <a href="#"> About Us </a>
                </h3>
                <h3>
                    <a href="#"> Contact Us </a>
                </h3>
                <h3>
                    <a href="#"> FAQ </a>
                </h3>
                <h3>
                    <a href="#"> Privacy Policy </a>
                </h3>
            </div>
            <!-- Account Links -->
            <div class="footer-links">
                <h1>Account</h1>
                <h3>
                    ${user}
                </h3>
                <h3>
                    <a href="#"> View Cart </a>
                </h3>
                <h3>
                    <a href="#"> Checkout </a>
                </h3>
                <h3>
                    <a href="#"> Wishlist </a>
                </h3>
            </div>
            <!-- Shop Links -->
            <div class="footer-links">
                <h1>Shop</h1>
                <h3>
                    <a href="/shop"> Mens </a>
                </h3>
                <h3>
                    <a href="/shop"> Womens </a>
                </h3>
                <h3>
                    <a href="/shop"> Kids </a>
                </h3>
            </div>
            <!-- Socials -->
            <div class="footer-links">
                <h1>Follow Us</h1>
                <h3 class="fb">
                    <span><i class="fab fa-facebook-f"></i></span>
                    <a href="#"> Facebook </a>
                </h3>
                <h3 class="ig-text">
                    <span><i class="fab fa-instagram"></i></span>
                    <a href="#"> Instagram </a>
                </h3>
                <h3 class="twt">
                    <span><i class="fab fa-twitter"></i></span>
                    <a href="#"> Twitter </a>
                </h3>
                <h3 class="pint">
                    <span><i class="fab fa-pinterest"></i></span>
                    <a href="#"> Pinterest </a>
                </h3>
            </div>
        </section>
        <section class="sub-2">
            <h1>© 2021 -IV:IV by Brix Francisco</h1>
        </section>
    `
}

createFooter();