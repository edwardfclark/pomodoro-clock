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
        $("#state-text").html(backgroundPage.getPomodoroState().slice(0,1).toUpperCase()+backgroundPage.getPomodoroState().slice(1)+":");
    }

    $("#start-stop").click(() => backgroundPage.timerClick());
    $("#break-subtract").click(() => backgroundPage.decBreakLength());
    $("#break-add").click(() => backgroundPage.incBreakLength());
    $("#session-subtract").click(() => backgroundPage.decSessionLength());
    $("#session-add").click(() => backgroundPage.incSessionLength());
    $("#reset").click(() => backgroundPage.reset());

});