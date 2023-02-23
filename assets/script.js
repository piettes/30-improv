jQuery(document).ready(function ($) {

   var number = 1;
    $('#numero').html(number);

    $('#numero').mousedown(function(event) {
        switch (event.which) {
            case 1:
                number = number + 1;
                $('#numero').html(number);
                break;
            case 3:
                number = number - 1;
                $('#numero').html(number);
                break;
        };
    });

    var duration_minutes = 30;


    function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
    }

    function initializeClock(id) {
    
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    var minutes = $('#minutes').val();
    var endtime = new Date(Date.parse(new Date()) + minutes * 60 * 1000);
    
    window.clearInterval(window.timeinterval);
    function updateClock() {
        var t = getTimeRemaining(endtime);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        
        if (t.total <= 0) {
        clearInterval(timeinterval);
        }
    }

    updateClock();
    window.timeinterval = setInterval(updateClock, 1000);
    
    }


    var buttonInit = $('#init');
    buttonInit.click(function(){
        $('#intro').show();
        $('#content').show();
        $('#intro').trigger('play');
        $('#intro').on('ended',function(){
            $('#intro').hide();
            initializeClock('clockdiv');
        });
        
    });
    
    var buttonSkip = $('#skip');
    buttonSkip.click(function(){
        $('#intro').hide();
        $('#intro').trigger('pause');
        $('#content').show();
        initializeClock('clockdiv');        
    });
    
    var buttonPause = $('#pause');
    buttonPause.click(function(){
        //get minutes and seconds
        alert('Compteur en pause.');
    });


});
