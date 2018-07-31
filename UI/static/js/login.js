/**
 * Created by Dr.Kimpatrick on 7/25/2018.
 */

import {getUserInfo, availableRidesUrl, logResult} from './main.js';


/************ Login alone ****************************/

let form = document.getElementById("signInForm");
let loginErrorArea = document.getElementById("loginError");
/*
function logResult(key, value) {
    localStorage.setItem(key, value);
}*/


function readResponseAsJSON(response) {
    return response.json();
}

function fetchJSON(pathToResource) {
    fetch(pathToResource) // 1
    .then(readResponseAsJSON) // 2
    .then((data) => {
        if(data.Token){
            logResult("Token", data.Token); // setting token
            getUserInfo(); // setting username
            //window.location.replace(availableRidesUrl)
        }else{
            loginErrorArea.innerText = data.message;
        }

    }) // 3
}


form.addEventListener('submit', function getInfo(event){
    event.preventDefault();

    // Login with username or email
    let data = {
    password: form.password.value
    };

    let userInput = form.username_or_email.value,
    at = "@",
    dot = ".";

    if (userInput.includes(at) && userInput.includes(dot)){
        data['email'] = form.username_or_email.value
    }else {
        data['username'] = form.username_or_email.value
    }


    const login_uri = "http://127.0.0.1:5000/api/v1/auth/login";

    let h = new Headers({"Content-Type": "application/json", "Accept": "application/json"});

    // new Request(uri, option);
    let option = {
        method: "POST",
        //credentials: "same-origin",
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


