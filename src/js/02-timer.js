import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix';
import { convertMs } from './convertMs';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const { inputEl, btnStart, days, hours, minutes, seconds } = refs;

let targetDate;

btnStart.disabled = true;

btnStart.addEventListener('click', onStartTimer);

function onStartTimer(evt) {
  inputEl.disabled = true;
  const idTimer = setInterval(() => {
    const timeLeft = targetDate - Date.now();
    const showTime = convertMs(timeLeft);

    if (timeLeft <= 1000) {
      clearInterval(idTimer);
    }
    timeToPage(showTime);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0].getTime();
    if (targetDate <= Date.now()) {
      Report.warning('Please choose a date in the future.', '');
    } else {
      Report.success('You choose a correct date.', '');
      btnStart.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timeToPage(value) {
  days.textContent = addLeadingZero(value.days);
  hours.textContent = addLeadingZero(value.hours);
  minutes.textContent = addLeadingZero(value.minutes);
  seconds.textContent = addLeadingZero(value.seconds);
}
