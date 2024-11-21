let formData = { email: '', message: '' };

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : null;
};

const populateForm = () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    formData = savedData;
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data submitted:', formData);
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

populateForm();
