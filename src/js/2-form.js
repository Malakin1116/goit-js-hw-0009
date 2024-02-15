const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input[name="email"]');
const inputText = form.querySelector('textarea[name="message"]');

const currentObj = {
    email: '',
    message: '',
};

const localStorageKey = "feedback-form-state";
let localStorageData = '';

try {
    localStorageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    
    if (localStorageData && typeof localStorageData === 'object') {
        currentObj.email = localStorageData.email || '';
        currentObj.message = localStorageData.message || '';
        inputEmail.value = currentObj.email;
        inputText.value = currentObj.message;
    }
} catch (error) {
    console.error('Error parsing JSON:', error);
}

const upLoadNewDate = (event) => {
    const target = event.target;
    if (target === inputEmail) {
        currentObj.email = target.value.trim();
    } else if (target === inputText) {
        currentObj.message = target.value.trim();
    }
    localStorageData = JSON.stringify(currentObj);
    localStorage.setItem(localStorageKey, localStorageData);
};

form.addEventListener('input', upLoadNewDate);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputEmail.value.trim() === "" || inputText.value.trim() === '') {
        alert(`Please fill in all form fields before submitting.`);
        return;
    }
    console.log(JSON.parse(localStorage.getItem(localStorageKey)));
    localStorage.removeItem(localStorageKey);
    currentObj.email = '';
    currentObj.message = '';
    form.reset();
});