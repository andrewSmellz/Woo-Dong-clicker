let timesClicked=0;

function clickWooDong(){
    timesClicked++;
    console.log(timesClicked);
    document.getElementById("timesClicked").innerHTML= `you have clicked Woo-Dong ${timesClicked} times`;
}