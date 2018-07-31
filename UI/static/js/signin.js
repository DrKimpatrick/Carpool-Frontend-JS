function makeRideRequest(ride_id) {
    const rideRequestUrl = "http://127.0.0.1:5000/api/v1/rides/"+ride_id+"/requests";

    let user_h = new Headers({"Content-Type": "application/json",
                              "Authorization": getTokenFromVerifyUser()});

    // new Request(uri, option);
    let option = {
        method: "POST",
        //credentials: "same-origin",
        headers: user_h
    };

    let rideRequest = new Request(rideRequestUrl, option);

    function readResponseAsJSON(response) {
        return response.json();
    }

    function fetchJSON(pathToResource) {
        fetch(pathToResource) // 1
        .then(readResponseAsJSON) // 2
        .then(function (response){
            let toContainReqResponse = document.getElementById("requestResponseArea");
            toContainReqResponse.innerHTML = response.message
        })
    }
    fetchJSON(rideRequest)

}
