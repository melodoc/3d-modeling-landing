const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            hours = Math.floor(timeRemaining / 60 / 60), //если поставить % 24 -- у hours отвалятся часы
            minutes = Math.floor((timeRemaining / 60) % 60),
            seconds = Math.floor(timeRemaining % 60);
        return { timeRemaining, hours, minutes, seconds };
    };

    const modifyZeroDate = inputDate => {
        if (inputDate >= 0 && inputDate < 10) {
            return '0' + inputDate;
        }
        return inputDate;
    };


    const updateClock = () => {

        const timer = getTimeRemaining();

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
    };

    updateClock();
};

export default countTimer;
