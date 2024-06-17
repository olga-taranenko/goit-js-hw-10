import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', onNotificationBtnSubmit);

function onNotificationBtnSubmit(event) {
  event.preventDefault();
  const delayMs = Number(formElem.elements.delay.value);
  const state = formElem.elements.state.value;

  const createPromise = (delayMs, state) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delayMs);
        } else {
          reject(delayMs);
        }
      }, delayMs);
    });
  };
  createPromise(delayMs, state)
    .then(delayMs => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayMs}ms`,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#59a10d',
        theme: 'dark',
      });
    })
    .catch(delayMs => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayMs}ms`,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#ef4040',
        theme: 'dark',
      });
    });
  formElem.reset();
}
