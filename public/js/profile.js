const token = localStorage.getItem("token");
const issAdmin = localStorage.getItem("isAdmin");

window.onload = () => {
    if(issAdmin === "true"){
        window.location.replace('/admin/profile');
    } else if(!token || !issAdmin) {
        window.location.replace('/');
    }
}

const myProfile = document.querySelector("#my-profile");
const myOrders = document.querySelector("#my-orders");

myProfile.classList.add("nav-active");
myOrders.classList.remove("nav-active");

const userId = localStorage.getItem("userId");
const url = `https://iviv-wristwatch.herokuapp.com/`;
// const url = `http://localhost:5000/`;
const profile = document.querySelector(".profile");

fetch(`${url}get-user/${userId}`)
    .then(res => res.json())
    .then(res => {
        profile.innerHTML = `
            <h1 class="title">My Profile</h1>
            <div class="user-details">
                <div class="user-desc">
                    <h2>First Name: </h2>
                    <h2>${res.firstName} </h2>
                </div>
                <div class="user-desc">
                    <h2>Last Name: </h2>
                    <h2>${res.lastName}</h2>
                </div>
                <div class="user-desc">
                    <h2>Email: </h2>
                    <h2>${res.email}</h2>
                </div>
                <div class="user-desc">
                    <h2>Password: </h2>
                    <h2>********</h2>
                </div>
            </div>
            <div class="profile-actions">
                <a href="user-edit?userId=${res._id}" class="edit-btn">
                    Edit Details
                </a>
                <a href="#" class="change-pass-btn">
                    Change Password
                </a>
            </div>
        `
    })