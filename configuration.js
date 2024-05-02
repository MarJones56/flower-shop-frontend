const mode = 1;
const host_local = "http://localhost:8080";
const host_remote = "https://flower-shop-backend-latest.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
}

function saveTheToken(token) {
    localStorage.setItem("token", token);
    updateTheNavigationBar();
}

function removeTheToken() {
    localStorage.removeItem("token");
    updateTheNavigationBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken()
};

updateTheNavigationBar();

async function updateTheNavigationBar() {
    const navigation = document.getElementsByClassName("topnav")[0];
    let loginTag = navigation.children[navigation.children.length - 3];
    if(configuration.isLoggedIn()) {
        loginTag.innerHTML =
        '<img src="Logos/user.png">';
        loginTag = navigation.children[navigation.children.length - 1];
        loginTag.innerHTML =
        '<a href="trackorder.html">Track Order</a>';
    }
}

async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let customer = {email: email, password: password};
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    try {
        let response = await fetch(getHost() + "/signin", request);
        if (response.status == 200) {
            alert("Login was successful");
            const token = await response.text();
            saveTheToken(token);
            localStorage.setItem("email", email);
            location.href = "index.html";
        } else {
            console.log(`response status:${response.status}`);
            removeTheToken();
            alert("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        removeTheToken();
        alert("Something went wrong");
    }
}

async function logout() {
    removeTheToken();
        alert("Logged out.")
        location.href = "index.html";
}