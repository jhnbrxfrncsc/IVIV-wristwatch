const token = localStorage.getItem("token");
window.onload = () => {
    if(token){
        window.location.replace('/');
    }
}

const submitBtn = document.querySelector('.submit-btn');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const termsAndCond = document.querySelector('#terms-and-conditions');

const loader = document.querySelector(".loader");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }
    if(!termsAndCond.checked) {
        showAlert("you must agree to our terms and conditions");
    } else {
        loader.style.display = 'block';
        sendData('/signup', newUser);
    }
});

const sendData = (path, data) => {
    fetch(path, {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(response => {
            processData(response);
        })
}

const processData = (data) => {
    loader.style.display = null;
    if(data.alert) {
        showAlert(data.alert);
    } 

    if(data.message) {
        alert(data.message);
        window.location.replace("/login");
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