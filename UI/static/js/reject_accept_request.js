/**
 * Created by Dr.Kimpatrick on 8/1/2018.
 */

import {getFromCurrentUserInfo, logoutUser, loginPageUrl, getTokenFromVerifyUser, getGivenRideId} from './main.js'

// is displayed in the navigation bar
let usernameDisplayArea = document.getElementById('currentLoginUsername');
usernameDisplayArea.innerText = getFromCurrentUserInfo();

let logoutThisUser = document.getElementById('logoutThisUser');
logoutThisUser.onclick = function () {
    logoutUser();
};


let toContainRideDetails = document.getElementById("rideDetailContent");
let actionAreaRequests = document.getElementById('action_area_requests');


function displayRideGiven(result) {
    let rideInfo = result['Ride details'];
    let error = result['message']; // missing or expired token

    if (error) {
        window.location.replace(loginPageUrl)
    } else {
        let myHTML = '';
        myHTML += ` 
            <table style="background-color: silver; border-radius: 4px;"> 
                <tr> 
                    <th>Driver (username)</th> 
                    <td>${rideInfo['Driver details']['username']}</td> 
                </tr> 
                <tr> 
                    <th>Origin</th> 
                    <td>${rideInfo['origin']}</td> 
                </tr>
                <tr> 
                    <th>Destination</th> 
                    <td>${rideInfo['destination']}</td> 
                </tr> 
                <tr> 
                    <th>Meetpoint</th> 
                    <td>${rideInfo['meet_point']}</td> 
                </tr> 
                <tr> 
                    <th>Contribution</th> 
                    <td>${rideInfo['contribution']}</td> 
                </tr> 
                <tr> 
                    <th>NumFreeSpots</th> 
                    <td>${rideInfo['free_spots']}</td> 
                </tr> 
                <tr> 
                    <th>Start date</th> 
                    <td>${rideInfo['start_date']}</td> 
                </tr> 
                <tr> 
                    <th>Finish date</th> 
                    <td>${rideInfo['finish_date']}</td> 
                </tr> 
            </table> `;

        toContainRideDetails.innerHTML = myHTML;
        }
        //
        const rides_requests_uri = "http://127.0.0.1:5000/api/v1/users/rides/"+getGivenRideId()+"/requests";

        let request_header = new Headers({"Content-Type": "application/json",
                                  "Authorization": getTokenFromVerifyUser()});

        // new Request(uri, option);
        let option_request = {
            method: "GET",
            //credentials: "same-origin",
            headers: request_header
        };

        let request_req = new Request(rides_requests_uri, option_request);

        fetchRideRequestsJSON(request_req);
  }


function readRideResponseAsJSON(response) {
    return response.json();
  }

function fetchRideGivenJSON(pathToResource) {
    fetch(pathToResource) // 1
    .then(readRideResponseAsJSON) // 3
    .then(displayRideGiven) // 4
  }

const rideDetailUrl = "http://127.0.0.1:5000/api/v1/rides/"+getGivenRideId();

let user_h = new Headers({"Content-Type": "application/json",
                          "Authorization": getTokenFromVerifyUser()});

// new Request(uri, option);
let option = {
    method: "GET",
    //credentials: "same-origin",
    headers: user_h
};

let rides_req = new Request(rideDetailUrl, option);

fetchRideGivenJSON(rides_req);


/*****************************************************************************/
function displayRideRequests(result) {
    //console.log(result);
    let error = result['message']; // missing or expired token
    let rides = result["Ride_requests"];
    //console.log(rides.length);

    if (error){
        // Redirect to the login page
        window.location.replace(loginPageUrl);

    }else {

        let myHTML = `<table>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>`;
        let num = 0;
        for(let index in rides) {
            let dict = rides[index];
            let passengerInfo = dict['passenger_details'];

            // generate number
            num++;


            myHTML += `<tr>
                                <td>${num}</td>
                                <td>${passengerInfo['username']}</td>
                                <td>${passengerInfo['email']}</td>
                                <td>${passengerInfo['phone_number']}</td>
                                <td>
                                    <span><button class="success">Accept</button></span>
                                    <span><button class="danger">Reject</button></span>
                                </td>
                            </tr>`;

        }
        myHTML += '</table>';
        actionAreaRequests.innerHTML = myHTML;

    }
}

function readRidesRequestResponseAsJSON(response) {
    return response.json();
  }

function fetchRideRequestsJSON(pathToResource) {
    fetch(pathToResource)
    .then(readRidesRequestResponseAsJSON)
    .then(displayRideRequests)
  }

