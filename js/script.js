const city = document.getElementById('city');
const find = document.getElementById('find');
const form = document.querySelectorAll('.form');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const locationResult = document.querySelector('#locationResult');
// today variables
const todayDay = document.querySelector('.today .day');
const todayDayDate = document.querySelector('.today .date');
const todayCity = document.querySelector('.today .city-name');
const todayTemp = document.querySelector('.today .temp-deg');
const todayIcon = document.querySelector('.today .today-icon');
const todayWeatherCon = document.querySelector('.today .weather-condition');
const windSpeed = document.querySelector('.today .wind-speed');
const windDir = document.querySelector('.today .wind-dir');

// tomorrow variables
const tomrDay = document.querySelector('.tomorrow .day');
const tomrIcon = document.querySelector('.tomorrow .tom-icon');
const tomrMaxTemp = document.querySelector('.tomorrow .max-temp');
const tomrMinTemp = document.querySelector('.tomorrow .min-temp');
const tomrWeatherCon = document.querySelector('.tomorrow .weather-condition');

//after tomorrow variables
const afterTomrDay = document.querySelector('.after-tomorrow .day');
const afterTomrIcon = document.querySelector('.after-tomorrow .aft-tom-icon');
const afterTomrMaxTemp = document.querySelector('.after-tomorrow .max-temp');
const afterTomrMinTemp = document.querySelector('.after-tomorrow .min-temp');
const afterTomrWeatherCon = document.querySelector('.after-tomorrow .weather-condition');



for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('submit', function (e) {
        e.preventDefault();

    });

}
find.addEventListener('click', function () {
    forecast(city.value);


})
city.addEventListener('input', function () {
    forecast(city.value);
})

async function forecast(myCity) {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dde2d42dfb0c4ffdbc2122013241306&q=${myCity}&days=3`);
    let data = await result.json();
    //console.log(data);

    let todayDate = new Date();
    let todayName = days[todayDate.getDay()];
    let dateNum = todayDate.getDate();
    let monthName = months[todayDate.getMonth()];


    let today = {
        locationName: data.location.name,
        dayName: todayName,
        date: dateNum,
        monName: monthName,
        conditionText: data.current.condition.text,
        conditionIcon: data.current.condition.icon,
        temp: data.current.temp_c,
        wind: data.current.wind_kph,
        windDr: data.current.wind_dir


    };
    console.log(today);
    console.log(today.conditionIcon);

    let tomorrowDate = new Date(data.forecast.forecastday[1].date);
    let tomorrowName = days[tomorrowDate.getDay()];

    let tomorrow = {
        day: tomorrowName,
        maxTemp: data.forecast.forecastday[1].day.maxtemp_c,
        minTemp: data.forecast.forecastday[1].day.mintemp_c,
        conditionText: data.forecast.forecastday[1].day.condition.text,
        conditionIcon: data.forecast.forecastday[1].day.condition.icon

    }
    console.log(tomorrow);

    let afterTomrDate = new Date(data.forecast.forecastday[2].date);
    let afterTomrName = days[afterTomrDate.getDay()];

    let afterTomorrow = {
        day: afterTomrName,
        maxTemp: data.forecast.forecastday[2].day.maxtemp_c,
        minTemp: data.forecast.forecastday[2].day.mintemp_c,
        conditionText: data.forecast.forecastday[2].day.condition.text,
        conditionIcon: data.forecast.forecastday[2].day.condition.icon

    }
    console.log(afterTomorrow);
    displayWeather(today, tomorrow, afterTomorrow);
}

forecast('cairo');

function displayWeather(today, tomorrow, afterTomorrow) {
    //Today 
    todayDay.innerHTML = today.dayName;
    todayDayDate.innerHTML = today.date + " " + today.monName;
    todayCity.innerHTML = today.locationName;
    todayTemp.innerHTML = `${today.temp}<sup>o</sup>C`;
    todayIcon.setAttribute('src', `https:${today.conditionIcon}`);
    todayWeatherCon.innerHTML = today.conditionText;
    windSpeed.innerHTML = `<img src="./images/icon-wind.png" alt="icon-wind">
${today.wind}km/h`;
    windDir.innerHTML = ` <img src="./images/icon-compass.png" alt="icon-compass"> ${today.windDr}`;



    //Tomorrow
    tomrDay.innerHTML = tomorrow.day;
    tomrIcon.setAttribute('src', `https:${tomorrow.conditionIcon}`);
    tomrMaxTemp.innerHTML = `${tomorrow.maxTemp}<sup>o</sup>C`;
    tomrMinTemp.innerHTML = `${tomorrow.minTemp}<sup>o</sup>`;
    tomrWeatherCon.innerHTML = tomorrow.conditionText;

    //after Tomorrow
    afterTomrDay.innerHTML = afterTomorrow.day;
    afterTomrIcon.setAttribute('src', `https:${afterTomorrow.conditionIcon}`);
    afterTomrMaxTemp.innerHTML = `${afterTomorrow.maxTemp}<sup>o</sup>C`;
    afterTomrMinTemp.innerHTML = `${afterTomorrow.minTemp}<sup>o</sup>`;
    afterTomrWeatherCon.innerHTML = afterTomorrow.conditionText;
}




//User Location

function success(position) {
    let { coords } = position;
    locationResult.innerHTML = `See your location on a map <i class="fa-solid fa-map-location-dot fs-4 text-danger"></i>`;
    locationResult.href = `https://www.openstreetmap.org?mlat=${coords.latitude}&mlon=${coords.longitude}`;
}


    navigator.geolocation.getCurrentPosition(success);

