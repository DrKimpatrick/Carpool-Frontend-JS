/**
 * Created by Dr.Kimpatrick on 6/14/2018.
 */

export let loginPageUrl = "index.html";
export let availableRidesUrl = "available_ride_offers.html";

/*************** Getting Current user info ***************/
function logUserInfo(result) {
    let userInfoResult = result['User_info'];
    let tokenInfo = result['message'];
    if (tokenInfo){
        // the token is missing or is expired

        // set isLoggedIn to false
        VerifyUser.isLoggedIn = false;

        // redirect to the login page
        window.location.replace(loginPageUrl)
    }else {
        // lets now get the info of the current user
        // Update userInfo in VerifyUser
        VerifyUser.userInfo.username = userInfoResult['username'];
        VerifyUser.userInfo.email = userInfoResult['email'];
        VerifyUser.userInfo.phone_number = userInfoResult['phone_number'];
        VerifyUser.userInfo.gender = userInfoResult['gender'];

        // also set isLoggedIn to true
        VerifyUser.isLoggedIn = true;
        // from here call any protected endpoint because the toke
        // is valid
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

/**************************************/
export let VerifyUser = {
    token: "", // contains the jwt token
    userInfo: {username: "", email: "", phone_number: "", gender: ""},
    isLoggedIn: false,
    logoutUser: function verifyLogin() {
        // It resets the token to an empty string on logout
        // It resets the isLoggedIn back to false
        // and redirects back to the login page
        VerifyUser.token = '';
        VerifyUser.isLoggedIn = false;
        window.location.replace(loginPageUrl)

    },
    getUserInfo: function getInfo() {
        // this function retrieves the info of the current user
        // It updates the userInfo key of VerifyUser
        // also confirms if user is really logged in
        const userInfoUrl = "http://127.0.0.1:5000/api/v1/current/user/info";

        let header = new Headers({"Content-Type": "application/json",
                                  "Authorization": VerifyUser.token});

        // new Request(uri, option);
        let option = {
            method: "GET",
            headers: header
        };

        let req = new Request(userInfoUrl, option);

        // call to the function that fetches the current user info
        fetchCurrentUserInfo(req)
    }
};

