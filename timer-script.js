$(document).ready(function () {
    //This is the timer variable that gets set, reset, and used later in the code.
    let timer;

    //Start and stop the timer when #timer is clicked.
    $("#timer").click(function() {
        if ($("#timer").attr("data-status") == "pause") {
            //Start the timer, remove the pause-text class from #timer, hide the buttons, add the state class to the body tag.
            timer = setInterval(countdown, 1000);
            $("#timer").attr("data-status", "run").removeClass("pause-text");
            $("#session-buttons, #break-buttons").removeClass("show").addClass("hide");
            $("body").addClass($("#interval-state").attr("data-state"));
        } else if ($("#timer").attr("data-status") == "run") {
            //Stop the timer, add the pause-text class to #timer, show the buttons, remove the state class from the body tag.
            clearInterval(timer);
            $("#timer").attr("data-status", "pause").addClass("pause-text");
            $("#session-buttons, #break-buttons").removeClass("hide").addClass("show");
            $("body").removeClass($("#interval-state").attr("data-state"));
        }
    });

    //The timerChange() function is called whenever the user wants to alter the length of the break or the session.

    //The countdown function is the callback used in the setInterval statement.
    function countdown() {

        let secs = parseInt($("#seconds").attr("data-seconds"));
        let mins = parseInt($("#minutes").attr("data-minutes"));

        
        //Subtract from secs unless secs is 0, update the values on the page inside both the tags and the data attributes.
        secs > 0 ? secs-- : secs;
        $("#seconds").attr("data-seconds", secs);
        secs < 10 ? $("#seconds").html("0"+secs) : $("#seconds").html(secs);
        $("#minutes").html(mins);

        //If there are minutes left but no seconds left, subtract minutes and reset seconds.
        if (secs === 0 && mins > 0) {
            mins--;
            $("#seconds").attr("data-seconds", "60");
            $("#minutes").attr("data-minutes", mins);

        } else if (secs === 0 && mins === 0) {
            //Get the current state of the interval - session or break.
            let state = $("#interval-state").attr("data-state");

            if (state == "session") {
                //Change the internal state from session to break.
                $("#interval-state").attr("data-state", "break");
                
                //Change the timer to the break's value.
                let breakMinutes = $("#break-length").attr("data-time");
                $("#minutes").attr("data-minutes", breakMinutes).html(breakMinutes);
                $("body").removeClass("session").addClass("break");
                $("#state-text").html("Break");
            } else {
                //Change the internal state from break to session.
                $("#interval-state").attr("data-state", "session");

                //Change the timer to the session's value.
                let sessionMinutes = $("#session-length").attr("data-time");
                $("#minutes").attr("data-minutes", sessionMinutes).html(sessionMinutes);
                $("body").removeClass("break").addClass("session");
                $("#state-text").html("Session");
            }
        }
    }


    

});