'use strict';



  const time = document.getElementById('time'),
    dayAndDate = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    city = document.getElementById('city'),
    changeBGButton = document.getElementById('BGChange');

  let counterBGIndex;

  const blockquote = document.querySelector('blockquote');
  const quoteChangeButton = document.querySelector('.change-quote');
  const weather = document.querySelector('.weather-description');
  const weatherIcon = document.querySelector('.weather-icon');


  function showTime() {  
    let now = new Date(),    
      hour = now.getHours(),
      min = now.getMinutes(),
      sec = now.getSeconds();  

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);  
  }

  function showDayAndDate() {  
    let now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth(),
      date = now.getDate(),
      day = now.getDay(),
      hour = now.getHours(),
      min = now.getMinutes(),
      sec = now.getSeconds(); 

    dayAndDate.innerText = `${redefineDay(day)}, ${date} ${redefineMonth(month)}`;

    let nextChangeTime = new Date (year, month, date+1);
    let ms = nextChangeTime - now;   
    setTimeout(showDayAndDate, ms);
  }

  function redefineDay(day) {
    const DAYS = {0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday'};
    return DAYS[day];
  }

  function redefineMonth(month) {
    const MONTHS = {0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 6:'July', 7:'August',
    8:'September', 9:'October', 10:'November', 11:'December'};
    return MONTHS[month];
  }

  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  function createDayPicturesList() {
    const PICTURES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg',
    '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg',
    '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    let dayBGList = new Array();
    let k=0;
    let usedUrl = new Map();
    const picturesNum = 6;
    const periodsNum = 4; 

    for (let i=0; i<periodsNum; i++) { 
      for (let j=0; j<picturesNum; j++) {
        let data;
        let urlBase;
        do {
          let index = Math.floor(Math.random()*PICTURES.length);
          data = PICTURES[index];                       
        }    
        while (usedUrl.has(data));

        switch(i) {
          case 0:
            urlBase = 'night/';
            break;
          case 1:
            urlBase = 'morning/';
            break;
          case 2:
            urlBase = 'day/';
            break;
          case 3:
            urlBase = 'evening/';
            break;
        }
              
        dayBGList[k] = urlBase+data;
        k++;
        usedUrl.set(data, true);                   
      }
      usedUrl.clear();
    }
    return dayBGList;   
  }

  let dayBGList = createDayPicturesList();

  function setBackGroundAndGreet() {
    counterBGIndex = 1;

    let now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth(),
      date = now.getDate(),
      hour = now.getHours();

    if (hour === 0) {
      dayBGList = createDayPicturesList();
    }
    console.log(dayBGList);

    if (hour>=6 && hour<12) {        
      greeting.textContent = 'Good Morning';
    } else if (hour>=12 && hour<18) {        
      greeting.textContent = 'Good Afternoon';
    } else if (hour>=18 && hour<24) {        
      greeting.textContent = 'Good Evening';    
    } else {        
      greeting.textContent = 'Good Night';    
    }

    let backGroundSrc = dayBGList[hour];
    showBackGround(backGroundSrc);

    let nextChangeTime = new Date (year, month, date, hour+1);
    let ms = nextChangeTime - now;

    setTimeout(setBackGroundAndGreet, ms);    
  }


  function getName() {
    if (localStorage.getItem('personName') === null || localStorage.getItem('personName').trim() === '') {  
      name.value = '[Enter Name]';        
    } else {
      name.value = localStorage.getItem('personName');     
    }
  }

  function setName(e) {
    if (e.type === 'keypress') {
      if (e.keyCode == 13) {
        if (e.target.value.trim() !== '') {
        localStorage.setItem('personName', e.target.value);      
        } else {
          getName();
        }
        name.blur();
      }
    } else if (e.target.value.trim() !== '') {
      localStorage.setItem('personName', e.target.value);                
    } else {
      getName(); 
    }
  }

  function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus').trim() === '') {
      focus.value = '[Enter Focus]';
    } else {
      focus.value = localStorage.getItem('focus');
    }
  }

  function setFocus(e) {
    if (e.type === 'keypress') {
      if (e.keyCode == 13) {
        if (e.target.value.trim() !== '') {
        localStorage.setItem('focus', e.target.value);      
        } else {
          getFocus();
        }
        focus.blur();
      }
    } else if (e.target.value.trim() !== '') {
      localStorage.setItem('focus', e.target.value);                
    } else {
      getFocus(); 
    }
  }
  
  function setCity(e) {
    if (e.type === 'keypress') {
      if (e.keyCode == 13) {
        if (e.target.value.trim() !== '') {
          localStorage.setItem('city', e.target.value);          
        } else {
          getCity();
        }
        getWeather();
        city.blur();
      }
    } else if (e.type === 'blur') {
      if (e.target.value.trim() !== '') {
        localStorage.setItem('city', e.target.value);
      } else {
        getCity();
      }
      getWeather();                
    }
  }

  function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city').trim() === '') {
      city.value = '[Enter City]';
    } else {
      city.value = localStorage.getItem('city');
    }
  }

  function cleanField(e) {  
    e.target.value = '';    
  }

  function changeBackGround() {
    let now = new Date(),    
      hour = now.getHours();
    let nextBGSrc = getBackGround(hour);
    showBackGround(nextBGSrc);
    counterBGIndex++;
    changeBGButton.disabled = true;  
    document.body.addEventListener('transitionend', transitionEndCallBack);  
  }

  function transitionEndCallBack() {
    changeBGButton.disabled = false;
    document.body.removeEventListener('transitionend', transitionEndCallBack);
  }

  function getBackGround(startIndex) { 
    let index = (startIndex + counterBGIndex) % dayBGList.length;
    const backGroundSrc = dayBGList[index];
    return backGroundSrc;
  }

  function showBackGround(source) {  
    const img = document.createElement('img');
    img.src = `/momentum/assets/images/${source}`;
    img.onload = () => {      
      document.body.style.backgroundImage = `url("/momentum/assets/images/${source}")`;
    };
  }

  async function getQuote() {
    quoteChangeButton.disabled = true;  
    const url = 'https://api.adviceslip.com/advice';
    try {
      const response = await fetch(url);
      const data = await response.json();
      blockquote.textContent = data.slip.advice;    
    } catch (e) {
      console.error(e);
    } finally {
      quoteChangeButton.disabled = false;
    }    
  }
  
  async function getWeather() {
    let location;
    if (localStorage.getItem('city') === null || localStorage.getItem('city').trim() === '') {
      location = '[Enter City]';
    } else {
      location = localStorage.getItem('city');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=en&appid=d903f9f0ee896c1487303723586336cd&units=metric`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      weather.innerHTML = `<p class="temperature">${data.main.temp}</p>
      <p class="humidity"><span>Humidity:</span><span>${data.main.humidity}</span></p>
      <p class="wind"><span>Wind Speed:</span><span>${data.wind.speed}</span></p>`;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  
    } catch (e) {
      if (location !== '[Enter City]') {
        alert("Entered city doesn't exist");
        weather.innerHTML = '';
        weatherIcon.className = 'weather-icon owf';
        localStorage.setItem('city', '[Enter City]');
        city.value = '[Enter City]';        
      }
    }  
  }








window.addEventListener('DOMContentLoaded', getQuoteAndWeather);

async function getQuoteAndWeather() {
  getQuote();
  getWeather();
}


window.addEventListener('load', init);

function init() {
  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName);
  name.addEventListener('focus', cleanField);
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus);
  focus.addEventListener('focus', cleanField);
  city.addEventListener('keypress', setCity);
  city.addEventListener('blur', setCity);
  city.addEventListener('focus', cleanField);
  changeBGButton.addEventListener('click', changeBackGround);
  quoteChangeButton.addEventListener('click', getQuote);

  showTime();
  showDayAndDate();
  setBackGroundAndGreet();
  getName();
  getFocus();
  getCity();
}







