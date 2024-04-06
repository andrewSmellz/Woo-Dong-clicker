// Initial value for timesClicked
let timesClicked = 0;

// Function to update the timesClicked text
function clickWooDong() {
    timesClicked++;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
}


// Function to set a cookie
function setCookie(name, value, daysToExpire) {
    let expires = "";
    if (daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie value
function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Function to save the value of timesClicked to a cookie
function save() {
    setCookie("timesClicked", timesClicked, 7); // Save timesClicked to a cookie with a 7-day expiry
}

// Function to retrieve the value of timesClicked from a cookie and update the timesClicked variable and paragraph
function load() {
    let retrievedValue = getCookie("timesClicked");
    if (retrievedValue !== null) {
        timesClicked = parseInt(retrievedValue);
        document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
    } else {
        alert("Cookie not found or expired");
    }
}

function wipeData(){
    document.cookie = "timesClicked=; expires=Sat, 15 April 1989 00:00:00 UTC; path=/";
    timesClicked=0;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;

}