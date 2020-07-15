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

export default checkDigitsInput;
