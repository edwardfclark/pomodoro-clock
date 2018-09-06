chrome.runtime.onInstalled.addListener(function() {
    //let testTimer = setTimeout(() => alert("Yep, this refreshed."), 10000);
});

//This is the overall timer variable that controls the pomodoro clock. 
//The callback function here sets the variables for use in timer-script.js.
let timer = null;

//These variables are updated by the callback function in the timer variable and accessed by the timer-script.js file.
/*
let mins = 25; 
let secs = 0;
let breakLength = 5;
let sessionLength = 25;
let pomodoroState = "session";
*/

var pomObj = {
    mins: 25,
    secs: 0,
    breakLength: 5,
    sessionLength: 25,
    pomodoroState = "session"
}

//getEndTimer(), getPomodoroState(), getBreakLength(), and getSessionLength() are called in timer-script.js to update the DOM.
function getEndTimer() {
    if (pomObj.secs >= 10) {
        return `${pomObj.mins}:${pomObj.secs}`;
    } else {
        return `${pomObj.mins}:0${pomObj.secs}`;
    }
}

var getPomodoroState = () => pomObj.pomodoroState;
var getBreakLength = () => pomObj.breakLength;
var getSessionLength = () => pomObj.sessionLength;


//incBreakLength() and decBreakLength() are called to increment and decrement the breakLength variable.
function incBreakLength() {
    if (pomObj.breakLength < 60) {
        pomObj.pomodoroState === "break" ? (pomObj.breakLength = pomObj.breakLength + 1, pomObj.mins = pomObj.mins + 1) : pomObj.breakLength = pomObj.breakLength + 1;
    }
    
}

function decBreakLength() {
    if (pomObj.breakLength > 1) {
        pomObj.pomodoroState === "break" ? (pomObj.breakLength = pomObj.breakLength - 1, pomObj.mins = pomObj.mins - 1) : pomObj.breakLength = pomObj.breakLength - 1;
    }
    
}

//incSessionLength() and decSessionLength() are called to increment and decrement the sessionLength variable.
function incSessionLength() {
    if (pomObj.sessionLength < 60) {
        pomObj.pomodoroState === "session" ? (pomObj.sessionLength = pomObj.sessionLength + 1, pomObj.mins = pomObj.mins + 1) : pomObj.sessionLength = pomObj.sessionLength + 1;
    }
    
}

function decSessionLength() {
    if (pomObj.sessionLength > 1) {
        pomObj.pomodoroState === "session" ? (pomObj.sessionLength = pomObj.sessionLength - 1, pomObj.mins = pomObj.mins - 1) : pomObj.sessionLength = pomObj.sessionLength - 1;
    }
}

//This function swaps the state between "session" and "break". It will only be called when countdown() is running.
function swapPomodoroState(currentState) {
    currentState === "session" ? pomObj.pomodoroState = "break" : pomObj.pomodoroState = "session";
}

//This is the callback function for use in timerClick;
function countdown() {
    
    //If secs and mins are bother zero, swap states.
    if (pomObj.secs === 0 && pomObj.mins === 0) {
        swapPomodoroState(pomObj.pomodoroState);
        pomObj.pomodoroState === "break" ? pomObj.mins = pomObj.breakLength : pomObj.mins = pomObj.sessionLength;
    }
    //Decrement secs unless secs is already 0. In that case, set secs to 59 and decrement mins.
    pomObj.secs === 0 ? (pomObj.secs = 59, pomObj.mins = pomObj.mins - 1) : pomObj.secs = pomObj.secs - 1;
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