const user_FN = localStorage.getItem("firstName");
const user_LN = localStorage.getItem("lastName");
const user_email = localStorage.getItem("email");
const user_isAdmin = localStorage.getItem("isAdmin");
const user_token = localStorage.getItem("token");
const dashboardBtn = document.querySelector("#dashboard");



const createNav = () => {
    let nav = document.querySelector('.navbar');

    const userNav = (user_email && user_isAdmin === "true") ? (
        `<a href="/admin/profile" id="dashboard">
            <i class="fas fa-user">
                <span class="tooltiptext">Admin</span>
            </i>
        </a>
        <a id="logout-btn">
            <i class="fas fa-sign-out">
                <span class="tooltiptext">Logout</span>
            </i>
        </a>
        `
    ) : (user_email && user_isAdmin === "false") ? (
        `<a href="/profile">
            <i class="fas fa-user">
                <span class="tooltiptext">Profile</span>
            </i>
        </a>
        <a id="logout-btn">
            <i class="fas fa-sign-out">
                <span class="tooltiptext">Logout</span>
            </i>
        </a>`
    ) : (
        `<a href="/login">
            <i class="fas fa-user">
                <span class="tooltiptext">Login/Register</span>
            </i>
        </a>`
    );

    nav.innerHTML = `
        <div class="nav">
            <img 
                class="brand-logo"
                src="img/logo.png" 
                alt="brand-logo"
            >
            <div class="nav-links">
                <li>
                    <a href="/" id="home" class="nav-link-active">
                        Home
                    </a>
                    <a href="/shop" id="shop" class="nav-link-not-active">
                        Shop
                    </a>
                    <a href/about-us" id="about" class="nav-link-not-active">
                        About
                    </a>
                    <a href="/contact-us" id="contact" class="nav-link-not-active">
                        Contact
                    </a>
                </li>
            </div>
            <div class="nav-actions">
                ${userNav}
                <a href="/cart">
                    <i class="far fa-heart">
                        <span class="tooltiptext">Wishlist</span>
                    </i>
                </a>
                <a href="/cart">
                    <i class="far fa-shopping-cart">
                        <span class="tooltiptext">Cart</span>
                    </i>
                </a>
            </div>
        </div>
    `
}

createNav();


const logoutBtn = document.querySelector("#logout-btn");


logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("Logging you out. Redirecting you to homepage");
    window.location.reload();
    window.location.replace('/');
})
