const token = localStorage.getItem("token");

window.onload = () => {
    if(!token){
        alert("Please Login...");
        window.location.replace('/login');
    }
}
