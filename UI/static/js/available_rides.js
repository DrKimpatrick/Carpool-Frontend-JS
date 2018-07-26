/**
 * Created by Dr.Kimpatrick on 7/25/2018.
 */

import {availableRidesUrl, VerifyUser} from 'main.js'

var toContainRides = document.getElementById("availableRideArea");
function logResultUser(result) {

    var users = result['Rides'];
    var myHTML = '';
    for(var index in users) {
        var dict = users[index];

        myHTML += '<a href="request_ride.html"> \
        <div class="ride_template" id="ride_info"> \
            <header><h2>Standard</h2></header> \
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
                    <td id="destination">pending</td> \
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


function readRidesResponseAsJSON(response) {
    return response.json();
  }

function getAllRidesJSON(pathToResource) {
    fetch(pathToResource)
    .then(readRidesResponseAsJSON())
    .then(logResultUser)
  }



// now call this function
function call(){
    //
}

