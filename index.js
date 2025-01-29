let timesClicked = 0;
let cps = 0;
const numOfUpgrades=3;
const upgradesArr = new Array(numOfUpgrades).fill(0);
let autoClickerInterval;
const cpsCount = document.getElementById("cpsCount");
cpsCount.textContent=cps;

function clickWooDong() {
    timesClicked++;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
    console.log("click lmao owned");
}

function autoClickerWooDong(){
    cps=(upgradesArr[0]+10*upgradesArr[1]+100*upgradesArr[2])
    cpsCount.textContent=cps;
    timesClicked+=cps;
    document.getElementById("timesClicked").innerHTML = `You have clicked Woo-Dong ${timesClicked} times`;
    console.log("click lmao owned");
}

function purchaseUpgradeOne(){
    let cost = Math.floor(15 * (1.69**upgradesArr[0]));
    if(timesClicked<cost){
        return;
    }
    timesClicked-=cost;
    clearInterval(autoClickerInterval);
    upgradesArr[0]++;
    cost = Math.floor(15 * (1.69**upgradesArr[0]));
    document.getElementById("upgrade1").innerHTML = `first upgrade costs ${cost} <br> amount purchased: ${upgradesArr[0]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000)
}

function purchaseUpgradeTwo(){
    let cost = Math.floor(100 * (1.69**upgradesArr[1]));
    if(timesClicked<cost){
        return;
    }
    timesClicked-=cost;
    clearInterval(autoClickerInterval);
    upgradesArr[1]++;
    cost = Math.floor(100 * (1.69**upgradesArr[1]));
    document.getElementById("upgrade2").innerHTML = `first upgrade costs ${cost} <br> amount purchased: ${upgradesArr[1]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000)
}

function purchaseUpgradeThree(){
    let cost = Math.floor(1000 * (1.69**upgradesArr[2]));
    if(timesClicked<cost){
        return;
    }
    timesClicked-=cost;
    clearInterval(autoClickerInterval);
    upgradesArr[2]++;
    cost = Math.floor(1000 * (1.69**upgradesArr[2]));
    document.getElementById("upgrade3").innerHTML = `third upgrade costs ${cost} <br> amount purchased: ${upgradesArr[2]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000)
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
document.getElementById("upgrade1").addEventListener("click", purchaseUpgradeOne)
document.getElementById("upgrade2").addEventListener("click", purchaseUpgradeTwo);
document.getElementById("upgrade3").addEventListener("click", purchaseUpgradeThree);