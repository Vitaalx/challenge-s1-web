const inputs = document.querySelectorAll('.form-input');
const sumbitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.form');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.add('form-input--active');
    });

    input.addEventListener('blur', () => {
        input.classList.remove('form-input--active');
    });

    input.addEventListener('input', () => {
        const allInputsFilled = [...inputs].every(input => input.value !== '');

        if (allInputsFilled) {
            sumbitBtn.classList.remove('btn--disabled');
        } else {
            sumbitBtn.classList.add('btn--disabled');
        }
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const allInputsFilled = [...inputs].every(input => input.value !== '');

    if (allInputsFilled) {
        alert('Votre message a bien été envoyé !');
        inputs.forEach(input => {
            input.value = '';
        });
    }
});