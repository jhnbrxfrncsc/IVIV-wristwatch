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
adminProfile.classList.remove("nav-active");
adminProducts.classList.add("nav-active");
adminUsers.classList.remove("nav-active");


const showAlert = (msg) => {
    let alertBox = document.querySelector(".alert-box");
    let alertMsg = document.querySelector(".alert-msg");

    alertMsg.innerHTML = `
        <div class="alert-box">
            <i class="fas fa-times-square alert-icon"></i>
            <p class="alert-msg">
                ${msg}
            </p>
        </div>
    `;
    alertBox.classList.add("show-alert");
    setTimeout(() => {
        alertBox.classList.remove("show-alert");
    }, 3500)
}


// Image Upload
const labels = document.querySelectorAll('.uploaded-photo');
const fileInputs = document.querySelectorAll('.file-upload');
const prodId = localStorage.getItem("productId");

fileInputs.forEach((fileInput, index) => {
    fileInput.addEventListener("input", (e) => {
        e.preventDefault();
        console.log(e.target.files[0].name)
        labels[index].innerHTML = `
            <img 
                src="img/${e.target.files[0].name}" 
                alt="image"
                class="image-preview"
            >
        `    
    })
})