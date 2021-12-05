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
const myOrders = document.querySelector("#my-orders");
const allOrders = document.querySelector("#all-orders");


adminProfile.classList.remove("nav-active");
adminProducts.classList.remove("nav-active");
adminUsers.classList.remove("nav-active");
adminOrders.classList.add("nav-active");

allOrders.classList.add("nav-active");
myOrders.classList.remove("nav-active");

const tbody = document.querySelector(".table-body");

function thousands_separators(num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

fetch(`https://iviv-wristwatch.herokuapp.com/orders/get-orders`)
    .then(res => res.json())
    .then(res => {
        let allOrders = res.map(order => {
            const orderProds = order.products.map(orderProd => {
                return `
                    <ul>
                        <li>(${orderProd.qty}) ${orderProd.productBrand.toUpperCase()}: ${orderProd.productName}</li>
                    </ul>
                `
            })
            return `
                <tr>
                    <td>${order.purchaseDate.substring(0, 10)}</td>
                    <td>${order.email}</td>
                    <td>
                        ${orderProds.join(" ")}
                    </td>
                    <td>₱${thousands_separators(order.totalAmount)}</td>
                </tr>
            `
        })
        const tableHeaders = document.querySelectorAll("th");
        tableHeaders.forEach(theader => {
            theader.addEventListener("click", (e) => {
                let column = e.target.dataset.column;
                let order = e.target.dataset.order;

                if(order === 'desc') {
                    e.target.dataset.order = "asc";
                    allOrders = res.sort((a,b) => {
                        return a[column] > b[column] ? 1 : -1;
                    }).map(order => {
                        const orderProds = order.products.map(orderProd => {
                        return `
                            <ul>
                                <li>(${orderProd.qty}) ${orderProd.productBrand.toUpperCase()}: ${orderProd.productName}</li>
                            </ul>
                        `
                        })
                    return `
                        <tr>
                            <td>${order.purchaseDate.substring(0, 10)}</td>
                            <td>${order.email}</td>
                            <td>
                                ${orderProds.join(" ")}
                            </td>
                            <td>₱${thousands_separators(order.totalAmount)}</td>
                        </tr>
                    `
                })
                } else {
                    e.target.dataset.order = "desc";
                    allOrders = res.sort((a,b) => {
                        return a[column] < b[column] ? 1 : -1;
                    }).map(order => {
                    const orderProds = order.products.map(orderProd => {
                        return `
                            <ul>
                                <li>(${orderProd.qty}) ${orderProd.productBrand.toUpperCase()}: ${orderProd.productName}</li>
                            </ul>
                        `
                    })
                    return `
                        <tr>
                            <td>${order.purchaseDate.substring(0, 10)}</td>
                            <td>${order.email}</td>
                            <td>
                                ${orderProds.join(" ")}
                            </td>
                            <td>₱${thousands_separators(order.totalAmount)}</td>
                        </tr>
                    `
                })
            }
                tbody.innerHTML = allOrders.join(" ");
            })
        })
        tbody.innerHTML = allOrders.join(" ");
    })