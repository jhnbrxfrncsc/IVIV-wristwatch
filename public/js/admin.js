const adminNav = document.querySelector(".admin-nav");


adminNav.innerHTML = `
    <ul class="admin-nav-list">
        <li class="admin-nav-link">
            <a id="profile" href="/admin/profile">Profile</a>
        </li>
        <span>|</span>
        <li class="admin-nav-link">
            <a id="products" href="/admin/products">Products</a>
        </li>
        <span>|</span>
        <li class="admin-nav-link">
            <a id="users" href="/admin/users">Users</a>
        </li>
        <span>|</span>
        <li class="admin-nav-link">
            <a id="orders" href="/admin/orders">Orders</a>
        </li>
    </ul>
`