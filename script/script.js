window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Timer
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

    countTimer('10 july 2020');

    //Menu

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popUp

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'),
            width = document.documentElement.offsetWidth;

        let popupContentInterval,
            count = 150;

        const animationSpeed = 10;

        const popupContentAnimate = () => {
            popupContentInterval = requestAnimationFrame(popupContentAnimate);
            count -= animationSpeed;

            if (count === 0) {
                cancelAnimationFrame(popupContentInterval);
            }
            popupContent.style.marginTop = count + 'px';
        };


        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';

                if (width >= 768) {
                    popupContentAnimate();
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            count = 150;
        });
    };

    togglePopUp();
});
