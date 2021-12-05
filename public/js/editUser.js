const issAdmin = localStorage.getItem("isAdmin");
window.onload = () => {
    if(issAdmin === "false" || !isAdmin){
        alert("Only Authorized users can access this page. Redirecting you to homepage");
        window.location.replace('/');
    }
}

const adminProfile = document.querySelector("#profile");
const adminProducts = document.querySelector("#products");
const adminUsers = document.querySelector("#users");


adminProfile.classList.remove("nav-active");
adminProducts.classList.remove("nav-active");
adminUsers.classList.add("nav-active");

// URL PARAMS
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

const editUserForm = document.querySelector("#edit-user-form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const isCustomer = document.querySelector("#isAdmin");


fetch(`https://iviv-wristwatch.herokuapp.com/get-user/${userId}`)
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
            sendData(`https://iviv-wristwatch.herokuapp.com/edit-user/${res._id}`, updatedUser);
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
        window.location.replace("/admin/users");
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