/**
 * Created by Dr.Kimpatrick on 7/25/2018.
 */

import {VerifyUser, saveToVerifyUser, getUserInfo, saveToCurrentUserInfo, availableRidesUrl} from './main.js';

/************ Login alone ****************************/

let form = document.getElementById("signInForm");
let loginErrorArea = document.getElementById("loginError");

function logResult(result) {
    let token = result['Token'];
    let error = result['message'];

    if (token){
        // On successful login
        // Update the VerifyUser object
        VerifyUser.token = token;
        saveToVerifyUser();

        getUserInfo();
        saveToCurrentUserInfo();

        window.location.replace(availableRidesUrl);

    }else{
        loginErrorArea.innerText = error
    }
}


function readResponseAsJSON(response) {
    return response.json();
}

function fetchJSON(pathToResource) {
    fetch(pathToResource) // 1
    .then(readResponseAsJSON) // 2
    .then(logResult) // 3
}


form.addEventListener('submit', function getInfo(event){
    event.preventDefault();

    let data = {
    "username": form.username.value,
    "password": form.password.value
    };

    const login_uri = "http://127.0.0.1:5000/api/v1/auth/login";

    let h = new Headers({"Content-Type": "application/json", "Accept": "application/json"});

    // new Request(uri, option);
    let option = {
        method: "POST",
        headers: h,
        body: JSON.stringify(data)
    };
    let req = new Request(login_uri, option);
    fetchJSON(req);

    //getUserInfo();
    //saveToCurrentUserInfo();
    form.reset();
});

//console.log(getTokenFromVerifyUser());
//console.log(getFromCurrentUserInfo());





