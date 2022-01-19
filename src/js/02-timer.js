import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    startBtn: document.querySelector("[data-start]"),
    secEl: document.querySelector("[data-seconds]"),
    minsEl: document.querySelector("[data-minutes]"),
    hoursEl: document.querySelector("[data-hours]"),
    daysEl: document.querySelector("[data-days]"),
}
let intervalId = null;

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener("click", () => {
   intervalId = setInterval(updateClockface, 1000);
   refs.startBtn.setAttribute('disabled', true);
}
)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            window.alert("Please choose a date in the future")
        }
        else {
            refs.startBtn.removeAttribute("disabled")
        }
    }
    
  }

const fp = flatpickr('#datetime-picker', options);


function updateClockface() {
    const deltaTime = fp.selectedDates[0] - Date.now();
    const time = convertMs(deltaTime);
    refs.daysEl.textContent = time.days;
    refs.hoursEl.textContent = time.hours;
    refs.minsEl.textContent = time.minutes;
    refs.secEl.textContent = time.seconds;
    if (deltaTime < 1000) {
    clearInterval(intervalId);
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

