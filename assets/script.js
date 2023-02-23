jQuery(document).ready(function ($) {

    var number = 1;
    $('#numero').html(number);

    const incCounter = () => {
        number = number + 1;
        $('#numero').html(number);
    }

    const decCounter = () => {
        number = number - 1;
        $('#numero').html(number);
    }

    $('#numero').mousedown(function (event) {
        switch (event.which) {
            case 1:
                incCounter();
                break;
            case 3:
                decCounter();
                break;
        }
    });

    let isRunning = false;

    const clock = document.getElementById('clockdiv');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
    let timeLeftInSeconds;

    function updateClock() {
        timeLeftInSeconds -= 1;
        let minutesLeft = Math.floor(timeLeftInSeconds / 60);
        let secondsLeft = timeLeftInSeconds % 60;

        minutesSpan.innerHTML = ('0' + minutesLeft).slice(-2);
        secondsSpan.innerHTML = ('0' + secondsLeft).slice(-2);

        if (timeLeftInSeconds <= 0) {
            clearInterval(timeinterval);
        }
    }

    function initializeClock() {
        let totalTimeInMinutes = $('#minutes').val();
        timeLeftInSeconds = totalTimeInMinutes * 60;

        clearCounter();
        updateClock();
        isRunning = true;
        startCounter();
    }

    const clearCounter = () => {
        window.clearInterval(window.timeinterval);
    }

    const startCounter = () => {
        window.timeinterval = setInterval(updateClock, 1000);
    }

    $('#init').click(function () {
        $('#intro').show();
        $('#content').show();
        $('#intro').trigger('play');
        $('#intro').on('ended', function () {
            $('#intro').hide();
            initializeClock();
        });
    });

    $('#skip').click(function () {
        $('#intro').hide();
        $('#intro').trigger('pause');
        $('#content').show();
        initializeClock('clockdiv');
    });

    $('#pause').click(function () {
        pause();
    });

    const pause = () => {
        console.log("pause");
        if (isRunning) {
            clearCounter();
        } else {
            startCounter();
        }
        isRunning = !isRunning;
    }

    document.addEventListener('keydown', function (event) {
        console.log(event);

        if (event.key === ' ') {
            pause();
        }
        if (event.key === "ArrowUp") {
            incCounter();
        }
        if (event.key === "ArrowDown") {
            decCounter();
        }
    });

});
