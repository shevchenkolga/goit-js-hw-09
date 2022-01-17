function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const NOTIFICATION_DELAY = 1000;
let timeoutId = null;
const body = document.querySelector("body")
console.log(body)
const btnStart = document.querySelector("[data-start]")
console.log(btnStart)
const btnStop = document.querySelector("[data-stop]")
console.log(btnStop)

btnStart.addEventListener("click", event => {
    timeoutId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        btnStart.disabled = true;
        btnStop.disabled = false;
    }, NOTIFICATION_DELAY)
}
)
btnStop.addEventListener("click", event => {
    btnStop.disabled = true;
    btnStart.disabled = false;
    clearInterval(timeoutId);
    
})
