//This is the overall timer variable that controls the pomodoro clock. 
//The callback function here sets the variables for use in timer-script.js.
let timer = null;

//These variables are updated by the callback function in the timer variable and accessed by the timer-script.js file.
let mins = 25; 
let secs = 0;
let breakLength = 5;
let sessionLength = 25;
let pomodoroState = "session";
let chime = new Audio("chime.wav");

//getEndTimer(), getPomodoroState(), getBreakLength(), and getSessionLength() are called in timer-script.js to update the DOM.
function getEndTimer() {
    if (secs >= 10) {
        return `${mins}:${secs}`;
    } else {
        return `${mins}:0${secs}`;
    }
}

var getPomodoroState = () => pomodoroState;
var getBreakLength = () => breakLength;
var getSessionLength = () => sessionLength;

//incBreakLength() and decBreakLength() are called to increment and decrement the breakLength variable.
function incBreakLength() {
    if (breakLength < 60) {
        pomodoroState === "break" ? (breakLength++, mins++) : breakLength++;
    }
}

function decBreakLength() {
    if (breakLength > 1) {
        pomodoroState === "break" ? (breakLength--, mins--) : breakLength--;
    }
}

//incSessionLength() and decSessionLength() are called to increment and decrement the sessionLength variable.
function incSessionLength() {
    if (sessionLength < 60) {
        pomodoroState === "session" ? (sessionLength++, mins++) : sessionLength++;
    }
}

function decSessionLength() {
    if (sessionLength > 1) {
        pomodoroState === "session" ? (sessionLength--, mins--) : sessionLength--;
    }
}

//This function swaps the state between "session" and "break". It will only be called when countdown() is running.
function swapPomodoroState(currentState) {
    currentState === "session" ? pomodoroState = "break" : pomodoroState = "session"
    
}

//This is the callback function for use in timerClick;
function countdown() {
    
    //If secs and mins are bother zero, swap states.
    if (secs === 0 && mins === 0) {
        swapPomodoroState(pomodoroState);
        pomodoroState === "break" ? mins = breakLength : mins = sessionLength;
        chime.play();
        return;
    }
    //Decrement secs unless secs is already 0. In that case, set secs to 59 and decrement mins.
    secs === 0 ? (secs = 59, mins--) : secs--;
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