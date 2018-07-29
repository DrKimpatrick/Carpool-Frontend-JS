/**
 * Created by Dr.Kimpatrick on 7/25/2018.
 */

import {loginPageUrl, logoutUser, getTokenFromVerifyUser, getFromCurrentUserInfo, getUserInfo, saveToCurrentUserInfo} from './main.js'


export function loadAvailableRides() {

getUserInfo();
saveToCurrentUserInfo();

let loginUsernameDisplayArea = document.getElementById("currentLoginUsername");

let toContainRides = document.getElementById("availableRideArea");

function logResultRides(result) {
    let error = result['message']; // missing or expired token
    let rides = result['Rides'];

    if (error){
        // Redirect to the login page
        window.location.replace(loginPageUrl);

    }else {
        loginUsernameDisplayArea.innerText = getFromCurrentUserInfo();
        let myHTML = '';
        for(let index in rides) {
            let dict = rides[index];
            /*myHTML += '<b>'+(dict['finish_date'])+'</b>';*/
            myHTML += '<a href="request_ride.html"> \
            <div class="ride_template" id="ride_info"> \
                <header><h2>http://127.0.0.1:5000/api/v1/rides/'+(dict['ride_id'])+'</h2></header> \
                <table> \
                    <tr> \
                        <th>Contribution</th> \
                        <td id="contribution">'+(dict['contribution'])+'</td> \
                    </tr> \
                    <tr> \
                        <th>NumFreeSpots</th> \
                        <td id="free_spots">'+(dict['free_spots'])+'</td> \
                    </tr> \
                    <tr> \
                        <th>Origin</th> \
                        <td id="origin">'+(dict['origin'])+'</td> \
                    </tr> \
                    <tr> \
                        <th>Destination</th> \
                        <td id="destination">'+(getFromCurrentUserInfo())+'</td> \
                    </tr> \
                    <tr> \
                        <th>Meetpoint</th> \
                        <td id="meetpoint">'+(dict['meet_point'])+'</td> \
                    </tr> \
                    <tr> \
                        <th>Start date</th> \
                        <td id="start_date">'+(dict['start_date'])+'</td> \
                    </tr> \
                    <tr> \
                        <th>Finish date</th> \
                        <td id="finish_date">'+(dict['finish_date'])+'</td> \
                    </tr> \
                </table> \
            </div> \
        </a> ';
        }
        toContainRides.innerHTML = myHTML;
    }
}


function readRidesResponseAsJSON(response) {
    return response.json();
  }

function getAllRidesJSON(pathToResource) {
    fetch(pathToResource)
    .then(readRidesResponseAsJSON)
    .then(logResultRides)
  }


const rides_uri = "http://127.0.0.1:5000/api/v1/rides";

let user_h = new Headers({"Content-Type": "application/json",
                          "Authorization": getTokenFromVerifyUser()});

// new Request(uri, option);
let option = {
    method: "GET",
    //credentials: "same-origin",
    headers: user_h
};

let rides_req = new Request(rides_uri, option);

getAllRidesJSON(rides_req);

let logout = document.getElementById("logoutThisUser");
logout.onclick = function () {
    logoutUser()
};
}

loadAvailableRides();