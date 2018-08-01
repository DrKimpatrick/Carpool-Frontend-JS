/**
 * Created by Dr.Kimpatrick on 6/14/2018.
 */

export let loginPageUrl = "index.html";
export let availableRidesUrl = "available_ride_offers.html";
export  let requestRideUrl = "request_ride.html";
export let rejectOrAcceptUrl = "reject_accept_request.html";
export let acceptedRideUrl = "accepted_ride_request.html";


// this currently returns the user token
export function getTokenFromVerifyUser() {
    return localStorage.getItem('Token');
}

export function getFromCurrentUserInfo() {
    return localStorage.getItem('userUsername')
}
export function getCurrentUserEmail() {
    return localStorage.getItem('userEmail')
}
export function getCurrentUserPhoneNumber() {
    return localStorage.getItem('userPhoneNumber')
}
export function getCurrentUserBio() {
    return localStorage.getItem('userBio')
}
export  function getRideId() {
    return localStorage.getItem('ride_id');
}
export  function getGivenRideId() {
    return localStorage.getItem('givenRideId');
}
export  function getTakenRideId() {
    return localStorage.getItem('takenRideId');
}
export function logoutUser() {
    // logout the current user
    localStorage.clear();
    window.location.replace(loginPageUrl)
}

function fetchCurrentUserInfo(pathToResource) {
    fetch(pathToResource) // 1
    .then((response) => response.json()) // 2
    .then((data) => {
        console.log(data);
        if(data.message){
            window.location.replace(loginPageUrl)
        }else {
            logResult("userUsername", data.User_info.username);
            logResult("userEmail", data.User_info.email);
            logResult("userBio", data.User_info.bio);
            logResult("userPhoneNumber", data.User_info.phone_number);
            window.location.replace(availableRidesUrl);
        }
    }) // 3
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
            //credentials: "same-origin",
            headers: header
        };

        let req = new Request(userInfoUrl, option);

        // call to the function that fetches the current user info
        fetchCurrentUserInfo(req);

    }

export function logResult(key, value) {
    localStorage.setItem(key, value);
}