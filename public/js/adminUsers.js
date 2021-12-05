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


adminProfile.classList.remove("nav-active");
adminProducts.classList.remove("nav-active");
adminUsers.classList.add("nav-active");
adminOrders.classList.remove("nav-active");

const url = `https://iviv-wristwatch.herokuapp.com/get-users-api`;
// const url = `http://localhost:5000/get-users-api`;

const userId = localStorage.getItem("userId");
const tableData = document.querySelector("#table-data");
fetch(url)
    .then(res => res.json())
    .then(res => {
        const users = res.filter(user => user._id !== userId);
        let tbData = users.map(({_id, firstName, lastName, email, isAdmin, orders}) => {
            return (
                `<tr>
                    <td>....${_id.substring(_id.length - 5)}</td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${email}</td>
                    <td>${isAdmin ? "Admin" : "Customer"}</td>
                    <td>${orders.length}</td>
                    <td>
                        <a 
                            href="edit-user?userId=${_id}"
                            class="edit-btn"
                        >
                            <i class="fas fa-edit"></i>
                        </a>
                    </td>
                    <td>
                        <a 
                            href="blank?userId=${_id}&email=${email}&method=deleteUser"
                            class="delete-btn"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </td>
                </tr>`
            )
        });
        const tableHeaders = document.querySelectorAll("th");
        tableHeaders.forEach(theader => {
            theader.addEventListener("click", (e) => {
                let column = e.target.dataset.column;
                let order = e.target.dataset.order;

                if(order === 'desc') {
                    e.target.dataset.order = "asc";
                    tbData = users.sort((a,b) => {
                        return a[column] > b[column] ? 1 : -1;
                    }).map(({_id, firstName, lastName, email, isAdmin, orders}) => {
                        return (
                            `<tr>
                                <td>....${_id.substring(_id.length - 5)}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${email}</td>
                                <td>${isAdmin ? "Admin" : "Customer"}</td>
                                <td>${orders.length}</td>
                                <td>
                                    <a 
                                        href="edit-user?userId=${_id}"
                                        class="edit-btn"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>
                                <td>
                                    <a 
                                        href="blank?userId=${_id}&email=${email}&method=deleteUser"
                                        class="delete-btn"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>`
                        )
                    })
                } else if(order === 'asc'){
                    e.target.dataset.order = "desc";
                    tbData = users.sort((a,b) => {
                        return a[column] < b[column] ? 1 : -1;
                    }).map(({_id, firstName, lastName, email, isAdmin, orders}) => {
                        return (
                            `<tr>
                                <td>....${_id.substring(_id.length - 5)}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${email}</td>
                                <td>${isAdmin ? "Admin" : "Customer"}</td>
                                <td>${orders.length}</td>
                                <td>
                                    <a 
                                        href="edit-user?userId=${_id}"
                                        class="edit-btn"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </td>
                                <td>
                                    <a 
                                        href="blank?userId=${_id}&email=${email}&method=deleteUser"
                                        class="delete-btn"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>`
                        )
                    })
                }
                tableData.innerHTML = tbData.join(" ");
            })
        })
        tableData.innerHTML = tbData.join(" ");
    })