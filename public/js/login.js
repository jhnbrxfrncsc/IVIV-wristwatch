const token = localStorage.getItem("token");
window.onload = () => {
    if(token){
        window.location.replace('/');
    }
}


const submitBtn = document.querySelector('.submit-btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userInfo = {
        email: email.value,
        password: password.value
    }

    sendData('/login', userInfo);
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
    if(data.alert) {
        showAlert(data.alert);
    } else if(data.message) {
        // store in local storage
        const {_id, firstName, lastName, email, isAdmin } = data.result;
        localStorage.setItem("userId", _id);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("token", data.token);

        // alert successful message
        alert(data.message);

        // redirect to homepage
        window.location.replace("/");
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