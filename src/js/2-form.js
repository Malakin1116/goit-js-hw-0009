import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(FORM_KEY)) || {};
const { email, message } = form.elements;


function onInputData(event) {
  dataForm[event.target.name] = event.target.value.trim();
  localStorage.setItem(FORM_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm.email || dataForm.message) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

reloadPage();

function onFormSubmit(event) {
  event.preventDefault();

  if (!email.value.trim() || !message.value.trim()) {
    return alert(`Заповніть всі обов'язкові поля.`);
  }

  console.log({ email: email.value.trim(), message: message.value.trim() });

  localStorage.removeItem(FORM_KEY);
  event.currentTarget.reset();
  dataForm = {};
}