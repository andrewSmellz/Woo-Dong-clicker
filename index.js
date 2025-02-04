const numOfUpgrades=3;
const costBase = 1.15;
let autoClickerInterval;
const cpsCount = document.getElementById("cpsCount");
const clickCount = document.getElementById("timesClicked");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");
const upgrade3 = document.getElementById("upgrade3");

const state = {
    timesClicked: 0,
    cps: 0,
    upgradesArr: new Array(numOfUpgrades).fill(0),
    closeDate: new Date()
};
    
cpsCount.textContent = state.cps;


autoClickerInterval = setInterval(autoClickerWooDong,1000);


function clickWooDong() {
    state.timesClicked++;
    clickCount.innerHTML = `You have clicked Woo-Dong ${state.timesClicked} times`;
    console.log("click lmao owned");
}

function autoClickerWooDong(){
    state.cps=(state.upgradesArr[0]+10*state.upgradesArr[1]+100*state.upgradesArr[2])
    cpsCount.textContent=state.cps;
    state.timesClicked+=state.cps;
    clickCount.innerHTML = `You have clicked Woo-Dong ${state.timesClicked} times`;
    console.log("click auto lmao owned");
}

function purchaseUpgradeOne(){
    let cost = Math.floor(10 * (costBase**state.upgradesArr[0]));
    if(state.timesClicked<cost){
        return;
    }
    console.log("clicked upgrade 1 purchase");
    state.timesClicked-=cost;
    clearInterval(autoClickerInterval);
    state.upgradesArr[0]++;
    cost = Math.floor(10 * (costBase**state.upgradesArr[0]));
    upgrade1.innerHTML = `first upgrade costs ${cost} <br> amount purchased: ${state.upgradesArr[0]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000);
}

function purchaseUpgradeTwo(){
    let cost = Math.floor(100 * (costBase**state.upgradesArr[1]));
    if(state.timesClicked<cost){
        return;
    }
    state.timesClicked-=cost;
    clearInterval(autoClickerInterval);
    state.upgradesArr[1]++;
    cost = Math.floor(100 * (costBase**state.upgradesArr[1]));
    upgrade2.innerHTML = `second upgrade costs ${cost} <br> amount purchased: ${state.upgradesArr[1]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000);
}

function purchaseUpgradeThree(){
    let cost = Math.floor(1000 * (costBase**state.upgradesArr[2]));
    if(state.timesClicked<cost){
        return;
    }
    state.timesClicked-=cost;
    clearInterval(autoClickerInterval);
    state.upgradesArr[2]++;
    cost = Math.floor(1000 * (costBase**state.upgradesArr[2]));
    upgrade3.innerHTML = `third upgrade costs ${cost} <br> amount purchased: ${state.upgradesArr[2]}`;
     autoClickerInterval = setInterval(autoClickerWooDong,1000);
}


function save() {
    localStorage.setItem("userData", JSON.stringify(state));  
}   

function load() {
    let retrievedState = localStorage.getItem("userData");
    if (retrievedState !== null){
        console.log("save loaded");
        const parsedState = JSON.parse(retrievedState);
        state.timesClicked = parsedState.timesClicked;
        state.cps = parsedState.cps;
        state.upgradesArr = parsedState.upgradesArr;
        parsedState.closeDate = new Date(parsedState.closeDate);
        state.closeDate = parsedState.closeDate;
        state.timesClicked+=calculateOfflineEarnings(state.closeDate,state.cps);
        clickCount.innerHTML = `You have clicked Woo-Dong ${state.timesClicked} times`;
        cpsCount.textContent=state.cps;
        upgrade1.innerHTML = `First upgrade costs ${Math.floor(15 * (costBase ** state.upgradesArr[0]))} <br> Amount purchased: ${state.upgradesArr[0]}`;
        upgrade2.innerHTML = `Second upgrade costs ${Math.floor(100 * (costBase ** state.upgradesArr[1]))} <br> Amount purchased: ${state.upgradesArr[1]}`;
        upgrade3.innerHTML = `Third upgrade costs ${Math.floor(1000 * (costBase ** state.upgradesArr[2]))} <br> Amount purchased: ${state.upgradesArr[2]}`;
    } else {
        alert("No data found in local storage");
    }
}

function wipeData() {
    localStorage.removeItem("userData"); 
    state.timesClicked = 0;
    state.cps = 0;
    state.upgradesArr.fill(0);
    clickCount.innerHTML = `You have clicked Woo-Dong ${state.timesClicked} times`;
    cpsCount.textContent=state.cps;
    upgrade1.innerHTML = `First upgrade costs ${Math.floor(10 * (costBase ** state.upgradesArr[0]))} <br> Amount purchased: ${state.upgradesArr[0]}`;
        upgrade2.innerHTML = `Second upgrade costs ${Math.floor(100 * (costBase ** state.upgradesArr[1]))} <br> Amount purchased: ${state.upgradesArr[1]}`;
        upgrade3.innerHTML = `Third upgrade costs ${Math.floor(1000 * (costBase ** state.upgradesArr[2]))} <br> Amount purchased: ${state.upgradesArr[2]}`;
}


function calculateOfflineEarnings(closeDate,cps){
    openDate = new Date();
    console.log(`close date ${closeDate}`);
    console.log(`open date ${openDate}`);
    console.log(`difference ${((openDate.getTime()-closeDate.getTime())/1000)}`);
    return Math.floor(((openDate.getTime()-closeDate.getTime())/1000)*cps);
}


function onClose(event) {
    state.closeDate = new Date();
    save();
}




document.getElementById("save").addEventListener("click", save);
document.getElementById("load").addEventListener("click", load);
document.getElementById("wipe").addEventListener("click", wipeData);
document.getElementById("upgrade1").addEventListener("click", purchaseUpgradeOne)
document.getElementById("upgrade2").addEventListener("click", purchaseUpgradeTwo);
document.getElementById("upgrade3").addEventListener("click", purchaseUpgradeThree);


window.addEventListener("beforeunload", onClose); 