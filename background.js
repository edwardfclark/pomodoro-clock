chrome.runtime.onInstalled.addListener(function() {
    //let testTimer = setTimeout(() => alert("Yep, this refreshed."), 10000);
});

//This is the overall timer variable that controls the pomodoro clock. 
//The callback function here sets the variables for use in timer-script.js.
let timer = null;

//These variables are updated by the callback function in the timer variable and accessed by the timer-script.js file.
let mins = 25; 
let secs = 0;
let breakLength = 5;
let sessionLength = 25;
let pomodoroState = "paused";

//This function returns a string value assembled from mins and secs, for use in the timer-script.js file.
function getEndTimer() {
    if (secs >= 10) {
        return `${mins}:${secs}`;
    } else {
        return `${mins}:0${secs}`;
    }
}

//This function returns the pomodoroState string for use in the timer-script.js file.
var getPomodoroState = () => pomodoroState;

//This function returns the breakLength for use in the timer-script.js file.
var getBreakLength = () => breakLength;

function incBreakLength() {
    breakLength++;
}

function decBreakLength() {
    breakLength--;
}

//This function returns the sessionLength for use in the timer-script.js file.
var getSessionLength = () => sessionLength;

function incSessionLength() {
    sessionLength++;
}

function decSessionLength() {
    sessionLength--;
}

//This function swaps the state between "session" and "break". It will only be called when countdown() is running.
function swapPomodoroState(currentState) {
    currentState === "session" ? currentState = "break" : currentState = "session";
}

//This is the callback function for use in timerClick;
function countdown() {
    //Decrement secs unless secs is already 0. In that case, set secs to 59 and decrement mins.
    secs === 0 ? (secs = 59, mins--) : secs--;

    //If secs and mins are bother zero, swap states.
    if (secs === 0 && mins === 0) {
        swapPomodoroState(pomodoroState);
        pomodoroState === "break" ? mins = breakLength : mins = sessionLength;
    }
}

//If the timer is running, stop the timer. If the timer is not running, start the timer.
function timerClick() {
    if (timer === null) {
        timer = setInterval(countdown, 1000);
    } else {
        clearInterval(timer);
        timer = null;
    }
}