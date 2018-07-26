/**
 * Created by Dr.Kimpatrick on 6/14/2018.
 */

export let loginPageUrl = "index.html";
export let availableRidesUrl = "available_ride_offers.html";


/**************************************/
export let VerifyUser = {
    token: "", // contains the jwt token
    userUsername: ""
};


export function saveToVerifyUser() {
    let str = JSON.stringify(VerifyUser);
    localStorage.setItem("VerifyUser", str)
}

// this currently returns the user token
export function getTokenFromVerifyUser() {
    let str = localStorage.getItem('VerifyUser');
    let response = JSON.parse(str);
    return response.token
}
/*
export function getFromCurrentUserInfo() {
    let str = localStorage.getItem('VerifyUser');
    let response = JSON.parse(str);
    return response
}
*/
export let currentUserInfo = {userUsername: ""};

export function saveToCurrentUserInfo() {
    let str = JSON.stringify(currentUserInfo);
    localStorage.setItem("currentUserInfo", str)
}

export function getFromCurrentUserInfo() {
    let str = localStorage.getItem('currentUserInfo');
    let response = JSON.parse(str);
    return response['userUsername']
}

export function logoutUser() {
    // logout the current user
    localStorage.clear();
    window.location.replace(loginPageUrl)
}

/*************** Getting Current user info ***************/
function logUserInfo(result) {
    let userInfoResult = result['User_info'];
    let tokenErrorInfo = result['message'];
    if (tokenErrorInfo){
        window.location.replace(loginPageUrl)
    }else {
        //currentUserInfo.username = userInfoResult['username'];
        //saveToCurrentUserInfo();
        //VerifyUser.token = getTokenFromVerifyUser();
        //VerifyUser.userUsername = userInfoResult['username'];

        //saveToVerifyUser
        currentUserInfo.userUsername = userInfoResult['username'];
        saveToCurrentUserInfo();
    }
}

function userInfoAsJson(response) {
    return response.json();
}

function fetchCurrentUserInfo(pathToResource) {
    fetch(pathToResource) // 1
    .then(userInfoAsJson) // 2
    .then(logUserInfo) // 3
}


export function getUserInfo() {
        // this function retrieves the info of the current user
        // It updates the userInfo key of VerifyUser
        // also confirms if user is really logged in
        const userInfoUrl = "http://127.0.0.1:5000/api/v1/current/user/info";

        let header = new Headers({"Content-Type": "application/json",
                                  "Authorization": getTokenFromVerifyUser()});

        // new Request(uri, option);
        let option = {
            method: "GET",
            headers: header
        };

        let req = new Request(userInfoUrl, option);

        // call to the function that fetches the current user info
        fetchCurrentUserInfo(req);

    }
