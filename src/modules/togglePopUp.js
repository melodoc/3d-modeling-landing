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

export default togglePopUp;
