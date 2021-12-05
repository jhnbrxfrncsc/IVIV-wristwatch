const issAdmin = localStorage.getItem("isAdmin");
window.onload = () => {
    if(!issAdmin){
        alert("Only Authorized users can access this page. Redirecting you to homepage");
        window.location.replace('/');
    }
}

const adminProfile = document.querySelector("#profile");
const adminProducts = document.querySelector("#products");
const adminUsers = document.querySelector("#users");
const adminOrders = document.querySelector("#orders");


adminProfile.classList.add("nav-active");
adminProducts.classList.remove("nav-active");
adminUsers.classList.remove("nav-active");
adminOrders.classList.remove("nav-active");

// URL PARAMS
const userId = localStorage.getItem("userId");

const editUserForm = document.querySelector("#edit-user-form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const isCustomer = document.querySelector("#isAdmin");

const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;

fetch(`${url}get-user/${userId}`)
    .then(res => res.json())
    .then(res => {
            firstName.value = res.firstName;
            lastName.value = res.lastName;
            email.value = res.email;
            isCustomer.value = res.isAdmin;

            editUserForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const updatedUser = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    isAdmin: isCustomer.value === "true" ? true : false
                }
                sendData(`${url}edit-user/${res._id}`, updatedUser);
            });
        })



const sendData = (path, data) => {
    fetch(path, {
        method: "PUT",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
            processData(response);
        })
}

const processData = (data) => {
    if(data.alert) {
        showAlert(data.alert);
    } 

    if(data.message) {
        alert(data.message);
        if(issAdmin == "true"){
            window.location.replace("admin/profile");
        } else {
            window.location.replace("/profile");
        }
    }
}

const showAlert = (msg) => {
    let alertBox = document.querySelector(".alert-box");
    let alertMsg = document.querySelector(".alert-msg");

    alertMsg.innerHTML = msg;
    alertBox.classList.add("show-alert");
    setTimeout(() => {
        alertBox.classList.remove("show-alert");
    }, 3500)
}