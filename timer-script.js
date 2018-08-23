$(document).ready(function () {
    
    const backgroundPage = chrome.extension.getBackgroundPage();
    let testVar = backgroundPage.bgTestVar;
    let renderTimer = setInterval(function() {
        
        console.log(backgroundPage.getter());
    }, 1000);
    //Start and stop the timer when #timer is clicked.
    $("#timer").click(backgroundPage.timerTest);
    
    //The timerChange() function is called whenever the user wants to alter the length of the break or the session.

    


    

});