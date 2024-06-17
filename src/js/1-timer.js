import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  input: document.querySelector('#datetime-picker'),
  daysElem: document.querySelector('[data-days]'),
  hoursElem: document.querySelector('[data-hours]'),
  minutesElem: document.querySelector('[data-minutes]'),
  secondsElem: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let intervalId;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= options.defaultDate) {
      refs.startBtn.disabled = true;
      refs.startBtn.classList.remove('active-btn');
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    } else {
      refs.startBtn.classList.add('active-btn');
      refs.startBtn.disabled = false;
      return userSelectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onBtnStart);

function onBtnStart() {
  refs.startBtn.disabled = true;
  refs.startBtn.classList.remove('active-btn');
  refs.input.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const time = convertMs(diff);
    console.log(diff);
    refs.daysElem.textContent = addLeadingZero(time.days);
    refs.hoursElem.textContent = addLeadingZero(time.hours);
    refs.minutesElem.textContent = addLeadingZero(time.minutes);
    refs.secondsElem.textContent = addLeadingZero(time.seconds);
    if (diff <= 1000) {
      clearInterval(intervalId);
      refs.input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
