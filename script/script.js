window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {

            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                day = Math.floor(timeRemaining / 60 / 60 / 24),
                hours = Math.floor(timeRemaining / 60 / 60) % 24,
                minutes = Math.floor((timeRemaining / 60) % 60),
                seconds = Math.floor(timeRemaining % 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function modifyZeroDate(inputDate) {
           if (inputDate >= 0 && inputDate < 10) {
               return '0'+ inputDate;
           } 
           return inputDate;            
        }


        function updateClock() {

            let timer = getTimeRemaining();

            timerHours.textContent = modifyZeroDate(timer.hours);
            timerMinutes.textContent = modifyZeroDate(timer.minutes);
            timerSeconds.textContent = modifyZeroDate(timer.seconds);

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
    }

    countTimer('19 july 2020');
});