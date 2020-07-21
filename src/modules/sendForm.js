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

const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
});

export default sendForm;
