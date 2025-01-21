let timesClicked = 0;

function clickWooDong() {
    timesClicked+=5;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
    console.log("click lmao");
}

function purchaseUpgrade(){
    console.log("working");
}


function save() {
    localStorage.setItem("timesClicked", timesClicked); 
}

function load() {
    let retrievedValue = localStorage.getItem("timesClicked");
    if (retrievedValue !== null) {
        timesClicked = parseInt(retrievedValue, 10);
        document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
    } else {
        alert("No data found in local storage");
    }
}

function wipeData() {
    localStorage.removeItem("timesClicked"); 
    timesClicked = 0;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
}


document.getElementById("save").addEventListener("click", save);
document.getElementById("load").addEventListener("click", load);
document.getElementById("wipe").addEventListener("click", wipeData);
document.getElementById("upgrade1").addEventListener("click", purchaseUpgrade)