function weatherData(city) {
    const apiKey = '29ca9b932a2508dt10ce6d3564ofaf97';
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  
    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        updateInterface(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  function updateInterface(data) {
    const weatherMain = data?.weather?.[0]?.main || null;

    const image = document.querySelector('.weather-box img');
    const weatherImages = {
        'Clear': 'https://i.ibb.co/0XPnVdc/clear.png',
        'Rain': 'https://i.ibb.co/FxmRy5n/rain.png',
        'Snow': 'https://i.ibb.co/zfftwpf/snow.png',
        'Clouds': 'https://i.ibb.co/R7rNsGd/cloud.png',
        'Mist': 'https://i.ibb.co/gvGqwG5/mist.png'
    };
    image.src = weatherImages[weatherMain] || 'https://i.ibb.co/R7rNsGd/cloud.png';

    const cityElement = document.querySelector('#city');
    const temperatureElement = document.querySelector('#temperature');
    const descriptionElement = document.querySelector('#description');
    const humidityElement = document.querySelector('#humidity');
    const windElement = document.querySelector('#windSpeed');

    cityElement.innerHTML = data?.location?.name || 'Unknown City';
    temperatureElement.innerHTML = `${data?.current?.temp_c} °C` || 'Unknown Temperature';
    descriptionElement.innerHTML = data?.current?.condition?.text || 'Unknown Description';
    humidityElement.innerHTML = `${data?.current?.humidity}%` || 'Unknown Humidity';
    windElement.innerHTML = `${data?.wind?.speed} Km/h` || 'Unknown Wind Speed';
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    weatherData(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

