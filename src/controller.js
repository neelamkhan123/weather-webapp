'use strict';
import images from './img/*.png';

const main = document.getElementById('main');
const mainContainerC = document.getElementById('main-container-c');
const mainContainerD = document.getElementById('main-container-d');
const navBar = document.querySelector('.nav-bar');
const btnSearch = document.querySelector('.search-bar');
const mainContainer = document.getElementById('main-container');
const inputField = document.querySelector('.search-bar-input');
const btnNav = document.querySelector('.btn-nav');
const searchContainer = document.querySelector('.search-results');
const currentWeather = document.querySelector('.current-weather');
const greetings = document.querySelector('.greetings');
const currentLocation = document.querySelector('.current-location');
const currentTime = document.querySelector('.current-time');
const currentDate = document.querySelector('.current-date');

const day0 = document.querySelector('.day-0');
const day1 = document.querySelector('.day-1');
const day2 = document.querySelector('.day-2');
const day3 = document.querySelector('.day-3');
const day4 = document.querySelector('.day-4');

const icon0 = document.querySelector('.daily-icon-0');
const icon1 = document.querySelector('.daily-icon-1');
const icon2 = document.querySelector('.daily-icon-2');
const icon3 = document.querySelector('.daily-icon-3');
const icon4 = document.querySelector('.daily-icon-4');

const min0 = document.querySelector('.min-0');
const min1 = document.querySelector('.min-1');
const min2 = document.querySelector('.min-2');
const min3 = document.querySelector('.min-3');
const min4 = document.querySelector('.min-4');

const max0 = document.querySelector('.max-0');
const max1 = document.querySelector('.max-1');
const max2 = document.querySelector('.max-2');
const max3 = document.querySelector('.max-3');
const max4 = document.querySelector('.max-4');

const hour0 = document.querySelector('.hour-0');
const hour1 = document.querySelector('.hour-1');
const hour2 = document.querySelector('.hour-2');
const hour3 = document.querySelector('.hour-3');
const hour4 = document.querySelector('.hour-4');
const hour5 = document.querySelector('.hour-5');
const hour6 = document.querySelector('.hour-6');
const hour7 = document.querySelector('.hour-7');
const hour8 = document.querySelector('.hour-8');
const hour9 = document.querySelector('.hour-9');
const hour10 = document.querySelector('.hour-10');
const hour11 = document.querySelector('.hour-11');

const hourlyIcon0 = document.querySelector('.hourly-icon-0');
const hourlyIcon1 = document.querySelector('.hourly-icon-1');
const hourlyIcon2 = document.querySelector('.hourly-icon-2');
const hourlyIcon3 = document.querySelector('.hourly-icon-3');
const hourlyIcon4 = document.querySelector('.hourly-icon-4');
const hourlyIcon5 = document.querySelector('.hourly-icon-5');
const hourlyIcon6 = document.querySelector('.hourly-icon-6');
const hourlyIcon7 = document.querySelector('.hourly-icon-7');
const hourlyIcon8 = document.querySelector('.hourly-icon-8');
const hourlyIcon9 = document.querySelector('.hourly-icon-9');
const hourlyIcon10 = document.querySelector('.hourly-icon-10');
const hourlyIcon11 = document.querySelector('.hourly-icon-11');

const hourlyDegree0 = document.querySelector('.hourly-degree-0');
const hourlyDegree1 = document.querySelector('.hourly-degree-1');
const hourlyDegree2 = document.querySelector('.hourly-degree-2');
const hourlyDegree3 = document.querySelector('.hourly-degree-3');
const hourlyDegree4 = document.querySelector('.hourly-degree-4');
const hourlyDegree5 = document.querySelector('.hourly-degree-5');
const hourlyDegree6 = document.querySelector('.hourly-degree-6');
const hourlyDegree7 = document.querySelector('.hourly-degree-7');
const hourlyDegree8 = document.querySelector('.hourly-degree-8');
const hourlyDegree9 = document.querySelector('.hourly-degree-9');
const hourlyDegree10 = document.querySelector('.hourly-degree-10');
const hourlyDegree11 = document.querySelector('.hourly-degree-11');

alert(
  'If api does not work, it will have exceeded 50 calls per day, please try again in 24hrs'
);

//////////////////////////////////////////////////////////////////////////

const apiKey = 'H8GaTAXb6X36KbRLq2UXM37U1c6OIvil';
const unit = '&metric=true';

// Search Form Submission
let inputValue;
btnNav.addEventListener('click', function () {
  inputValue = inputField.value;
  getSearch();
  clearSearchContainer();
});

// Hide Daily and Hourly Forecast
mainContainerC.classList.add('hidden');
mainContainerD.classList.add('hidden');

///////////////////////////FUNCTIONS//////////////////////////

// Open and Close Nav
const openNav = function () {
  navBar.style.width = '17rem';
  navBar.style.transition = 'width 0.3s ease-in';
};

const closeNav = function () {
  if ((navBar.style.width = '17rem')) {
    navBar.style.width = '4rem';
  }
};

const openAndCloseNav = function () {
  btnSearch.addEventListener('click', openNav);
  mainContainer.addEventListener('click', closeNav);
};
openAndCloseNav();

// Clear Search Container
const clearSearchContainer = function () {
  searchContainer.innerHTML = '';
  closeNav();
};

// Click Search Result
let searchResult;
const clickSearchResult = function () {
  searchResult.forEach(e => {
    e.addEventListener('click', function () {
      // Set Current Conditions
      getCurrentForecast(e.dataset.key, e.dataset.city, e.dataset.country);

      // Clear Search Container
      clearSearchContainer();

      // Set Forecast for the Next 5 Days
      getDailyForecast(e.dataset.key);

      // Set Forecast for the Next 12 Hours
      getHourlyForecast(e.dataset.key);

      // Refresh Page
      // btnSearch.addEventListener('click', function () {
      //   weatherIcons.innerHTML = '';
      // });
    });
  });
};

// Daily Forecast
const dailyForecast = function (data, i, day, label, icon, min, max) {
  // Day
  day.textContent = label;

  // Icon
  icon.src = images[data.DailyForecasts[i].Day.Icon];

  // Min Max Temp
  min.textContent =
    Math.ceil(data.DailyForecasts[i].Temperature.Maximum.Value) +
    data.DailyForecasts[i].Temperature.Minimum.Unit +
    ' | ';

  max.textContent =
    Math.ceil(data.DailyForecasts[i].Temperature.Minimum.Value) +
    data.DailyForecasts[i].Temperature.Minimum.Unit;
};

// Hourly Forecast
const hourlyForecast = function (data, hour, hourlyDegree, icon, i) {
  // Time
  hour.textContent = data[i].DateTime.slice(11, 13);

  // Iconn
  icon.src = images[data[i].WeatherIcon];

  // Temp
  hourlyDegree.textContent =
    Math.ceil(data[i].Temperature.Value) + data[i].Temperature.Unit;
};

// Day vs Night Mode
const nightMode = function () {
  main.style.background =
    'linear-gradient(315deg, rgb(23, 4, 133), rgb(3, 113, 238))';
  navBar.style.background =
    'linear-gradient(rgb(3, 113, 238), rgb(23, 4, 133))';
};

const dayMode = function () {
  main.style.background =
    'linear-gradient(315deg, rgb(141, 213, 255), rgb(204, 217, 231))';
  navBar.style.background =
    'linear-gradient(rgb(204, 217, 231), rgb(138, 221, 253))';
};

////////////////////////////API CALLS//////////////////////////////

const getSearch = async function () {
  try {
    const res = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${inputValue}`
    );
    const data = await res.json();

    const dataArr = Object.entries(data);
    dataArr.forEach(([_, value]) => {
      const city = value.AdministrativeArea.LocalizedName;
      const country = value.Country.LocalizedName;
      const countryCode = value.Country.ID;
      const locationKey = value.Key;

      const markup = `
        <li class="search-result" data-key="${locationKey}" data-city="${city}" data-country="${country}">${city}, ${country}, ${countryCode}</li>
        `;

      searchContainer.insertAdjacentHTML('beforeend', markup);

      searchResult = document.querySelectorAll('.search-result');
    });
    clickSearchResult();
  } catch (err) {
    console.error(err);
  }
};

let temperature;
let date;
let isDay;
let time;

const getCurrentForecast = async function (locationKey, city, country) {
  try {
    const res = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}${unit}`
    );
    const data = await res.json();
    // console.log(data);

    // Current Temperature
    temperature =
      Math.ceil(data[0].Temperature.Metric.Value) +
      data[0].Temperature.Metric.Unit;
    currentWeather.textContent = temperature;

    // Greetings
    isDay = data[0].IsDayTime;
    if (isDay) {
      greetings.textContent = 'Good Day';
      dayMode();
    }
    if (!isDay) {
      greetings.textContent = 'Good Night';
      nightMode();
    }

    // Curent Location
    currentLocation.textContent = `${city}, ${country}`;

    // Current Time
    time = data[0].LocalObservationDateTime.slice(11, 16);
    currentTime.textContent = time;

    // Current Date
    date = data[0].LocalObservationDateTime.slice(0, 10);
    currentDate.textContent = date;
  } catch (err) {
    console.error(err);
  }
};

const getDailyForecast = async function (locationKey) {
  try {
    const res = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}${unit}`
    );
    const data = await res.json();

    // Display Daily Forecast
    mainContainerC.classList.remove('hidden');

    // Display Next 4 Days
    dailyForecast(data, 0, day0, 'TODAY', icon0, min0, max0);
    dailyForecast(data, 1, day1, 'TOMORROW', icon1, min1, max1);
    dailyForecast(data, 2, day2, 'IN 2 DAYS', icon2, min2, max2);
    dailyForecast(data, 3, day3, 'IN 3 DAYS', icon3, min3, max3);
    dailyForecast(data, 4, day4, 'IN 4 DAYS', icon4, min4, max4);
  } catch (err) {
    console.error(err);
  }
};

const getHourlyForecast = async function (locationKey) {
  try {
    const res = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}${unit}`
    );
    const data = await res.json();

    // Display Hourly Forecast
    mainContainerD.classList.remove('hidden');

    // Display Next 12 Hours
    hourlyForecast(data, hour0, hourlyDegree0, hourlyIcon0, 0);
    hourlyForecast(data, hour1, hourlyDegree1, hourlyIcon1, 1);
    hourlyForecast(data, hour2, hourlyDegree2, hourlyIcon2, 2);
    hourlyForecast(data, hour3, hourlyDegree3, hourlyIcon3, 3);
    hourlyForecast(data, hour4, hourlyDegree4, hourlyIcon4, 4);
    hourlyForecast(data, hour5, hourlyDegree5, hourlyIcon5, 5);
    hourlyForecast(data, hour6, hourlyDegree6, hourlyIcon6, 6);
    hourlyForecast(data, hour7, hourlyDegree7, hourlyIcon7, 7);
    hourlyForecast(data, hour8, hourlyDegree8, hourlyIcon8, 8);
    hourlyForecast(data, hour9, hourlyDegree9, hourlyIcon9, 9);
    hourlyForecast(data, hour10, hourlyDegree10, hourlyIcon10, 10);
    hourlyForecast(data, hour11, hourlyDegree11, hourlyIcon11, 11);
  } catch (err) {
    console.error(err);
  }
};
