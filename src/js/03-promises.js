import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let delay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  });
}
