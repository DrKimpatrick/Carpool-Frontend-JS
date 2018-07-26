/**
 * Created by Dr.Kimpatrick on 7/26/2018.
 */

var form = document.getElementById("signInForm");
var myP = document.getElementById("loginError");

function logResult(result) {
    //console.log(result);
    var token = result['Token']
    var error = result['message']

    if (token){
        myP.innerText = token
    }else{
        myP.innerText = error
    }
    //myP.innerText = token

}

function validateResponse(response) {

    return response;
}

function readResponseAsJSON(response) {
    return response.json();
}

function fetchJSON(pathToResource) {
    fetch(pathToResource) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(logResult) // 4
    //.catch(logError);
}


form.addEventListener('submit', function getInfo(event){
    event.preventDefault();
    //var email = form.email.value;
    //myP.innerText = email;

    let data = {
    "username": form.email.value,
    "password": form.password.value
    }

    const login_uri = "http://127.0.0.1:5000/api/v1/auth/login";


    let h = new Headers({"Content-Type": "application/json", "Accept": "application/json"});
    // specify the form in which you expect the response
    // h.append("Accept", "application/json")

    // new Request(uri, option);
    let option = {
        method: "POST",
        headers: h,
        body: JSON.stringify(data)
    }
    let req = new Request(login_uri, option);
    fetchJSON(req);
    form.reset();
})
