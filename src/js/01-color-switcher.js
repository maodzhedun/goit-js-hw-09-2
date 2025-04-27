function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let id = null;

btnStart.addEventListener('click', startClick);
btnStop.addEventListener('click', stopClick);

function startClick(evt) {
  if (id) return;

  id = setInterval(() => {
    const bodyColor = getRandomHexColor();

    document.body.style.backgroundColor = bodyColor;
  }, 1000);

  btnStart.disabled = true;
  btnStop.disabled = false;
}

function stopClick(evt) {
  clearInterval(id);
  id = null;
  btnStart.disabled = false;
  btnStop.disabled = true;
}

btnStop.disabled = true;
