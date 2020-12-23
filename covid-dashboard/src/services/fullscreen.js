const fullscreenCountry = document.querySelector('.fullscreenCountry');
const fullscreenGlobal = document.querySelector('.fullscreenGlobal');
const fullscreenMap = document.querySelector('.fullscreenMap');
const fullscreenChart = document.querySelector('.fullscreenChart');

document.querySelector('.btn1').addEventListener('click', () => {
  fullscreenCountry.classList.toggle('opened');
});

document.querySelector('.btn3').addEventListener('click', () => {
  fullscreenGlobal.classList.toggle('opened');
});

document.querySelector('.btn2').addEventListener('click', () => {
  fullscreenMap.classList.toggle('opened');
});

document.querySelector('.btn4').addEventListener('click', () => {
  fullscreenChart.classList.toggle('opened');
});
