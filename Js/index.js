var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i];
}

console.log(baseURL);

var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

var signUpArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

function isEmpty() {
    return !(signupName.value === "" || signupEmail.value === "" || signupPassword.value === "");
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    };

    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    }
}

function isLoginEmpty() {
    return !(signinPassword.value === "" || signinEmail.value === "");
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var password = signinPassword.value;
    var email = signinEmail.value;

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase() && signUpArray[i].password === password) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);

            if (baseURL === './index.html') {
                location.replace('https://' + location.hostname + './home.html');
            } else {
                location.replace(baseURL + './home.html');
            }
            return;
        }
    }

    document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
}

function logout() {
    localStorage.removeItem('sessionUsername');
}
