$(document).ready(function () {
    
    const backgroundPage = chrome.extension.getBackgroundPage();
    
    //This timer will begin every time the popup loads, and the callback will run every second.
    let popupTimer = setInterval(backgroundChecker, 100);
    
    //This is the callback function for popupTimer.
    //It will call getEndTimer() and update the pomodoro.html page accordingly.
    //It will call getBreakLength() and getSessionLength() and update the pomodoro.html page, too.
    //This is the function that updates the DOM elements.
    function backgroundChecker() {
        $("#timer > h1").html(backgroundPage.getEndTimer());
        $("#break-length").html(backgroundPage.getBreakLength());
        $("#session-length").html(backgroundPage.getSessionLength());
    }

    $("#timer").click(() => backgroundPage.timerClick());

});