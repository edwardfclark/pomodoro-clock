chrome.runtime.onInstalled.addListener(function() {
    //let testTimer = setTimeout(() => alert("Yep, this refreshed."), 10000);
});

let timer;
let bgTestVar = "Loading...";

function timerTest() {
    timer = setTimeout(function() {
        bgTestVar = "Success!";
        console.log(bgTestVar);
    }, 5000);
}

function getter() {
    return bgTestVar;
}