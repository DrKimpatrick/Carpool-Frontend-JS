/**
 * Created by Dr.Kimpatrick on 7/27/2018.
 */

import {getUserInfo,saveToCurrentUserInfo,logoutUser, getTokenFromVerifyUser, getFromCurrentUserInfo} from './main'
getUserInfo();
saveToCurrentUserInfo();

let loginUsernameDisplayArea = document.getElementById("currentLoginUsername");
loginUsernameDisplayArea.innerText = getFromCurrentUserInfo();

let logout = document.getElementById("logoutThisUser");
logout.onclick = function () {
    logoutUser()
};
console.log(getFromCurrentUserInfo());
