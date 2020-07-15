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

    countTimer('20 july 2020');

    //Menu


    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.body.addEventListener('click', () => {
            const target = event.target;

            const closestBtnMenu = target.closest('.menu'),
                closestCloseBtn = target.closest('.close-btn'),
                closestMenuItems = target.closest('.active-menu ul>li'),
                closestActiveMenu = target.closest('.active-menu');

            if (closestBtnMenu || closestCloseBtn || closestMenuItems) {
                handlerMenu();
            }

            if (!closestActiveMenu && !closestBtnMenu) {
                menu.classList.remove('active-menu');
            }
        });
    };

    toggleMenu();

    // popUp

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

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


        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                const width = document.documentElement.clientWidth;
                popup.style.display = 'block';

                if (width >= 768) {
                    popupContentAnimate();
                }
            });
        });


        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                count = 150;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    count = 150;
                }
            }
        });
    };

    togglePopUp();

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //Slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            dot,
            interval;

        const insertDot = () => {
            dot = document.createElement('li');
            dot.classList.add('dot');
            for (let i = 0; i < slide.length; i++) {
                dot = dot.cloneNode();
                dots.append(dot);
            }

            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        insertDot();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');


            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });


        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();

    //Change photos

    const changePhoto = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach(elem => {
            const scrImg = elem.getAttribute('src');

            elem.addEventListener('mouseenter', event => {
                const target = event.target;
                target.src = target.dataset.img;
            });

            elem.addEventListener('mouseout', event => {
                const target = event.target;
                target.src = scrImg;
            });
        });
    };


    changePhoto();

    // Only digits input allowed

    const checkDigitsInput = () => {
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', event => {
            const target = event.target;
            const input = target.closest('input');

            if (input) {
                input.value = input.value.replace(/\D/, '');
            }
        });
    };

    checkDigitsInput();

    //Calc

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);

    //Send-ajax-form

    const sendForm = (selectedForm) => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById(selectedForm);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2rem;`;

        const phoneInput = form.querySelector('[type="tel"]');
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/(?<!^)\+|[^\d+]/g, '');
        });

        const textInput = form.querySelector('[type="text"]');
        textInput.addEventListener('input', () => {
            textInput.value = textInput.value.replace(/[^А-Яа-я\s]/g, '');
        });

        const messageInput = document.querySelector('#form2-message');
        messageInput.addEventListener('input', () => {
            messageInput.value = messageInput.value.replace(/[^А-Яа-я\s]/g, '');
        });


        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);

            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network is not 200');
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });
    };

    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
});
