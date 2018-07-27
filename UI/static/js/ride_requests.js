/**
 * Created by Dr.Kimpatrick on 7/27/2018.
 */

var toContainRideDetails = document.getElementById("rideDetailContent");
function logResultUser(result) {
    var result = result['Ride details'];

    //var myHTML = '';
    var myHTML = ' \
        <table> \
            <tr> \
                <th>Driver (name)</th> \
                <td>'+(result['Driver details']['username'])+'</td> \
            </tr> \
            <tr> \
                <th>Origin</th> \
                <td>'+(result['origin'])+'</td> \
            </tr> \
            <tr> \
                <th>Destination</th> \
                <td>pending</td> \
            </tr> \
            <tr> \
                <th>Meetpoint</th> \
                <td>'+(result['meet_point'])+'</td> \
            </tr> \
            <tr> \
                <th>Contribution</th> \
                <td>'+(result['contribution'])+'</td> \
            </tr> \
            <tr> \
                <th>NumFreeSpots</th> \
                <td>'+(result['free_spots'])+'</td> \
            </tr> \
            <tr> \
                <th>Start date</th> \
                <td>'+(result['start_date'])+'</td> \
            </tr> \
            <tr> \
                <th>Finish date</th> \
                <td>'+(result['finish_date'])+'</td> \
            </tr> \
        </table> ';

    //toContainRideDetails.innerHTML = myHTML;
    toContainRideDetails.innerHTML = myHTML;

  }


function readResponseAsJSONUser(response) {
    return response.json();
  }

function getUsersJSONUser(pathToResource) {
    fetch(pathToResource) // 1
    .then(readResponseAsJSONUser) // 3
    .then(logResultUser) // 4
  }




