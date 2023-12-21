function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();
    let imageElement = document.querySelector("#icon");

    let weatherIcons = {
        'Clear': 'https://i.ibb.co/0XPnVdc/clear.png',
        'Rain': 'https://i.ibb.co/FxmRy5n/rain.png',
        'Snow': 'https://i.ibb.co/zfftwpf/snow.png',
        'Clouds': 'https://i.ibb.co/R7rNsGd/cloud.png',
        'Mist': 'https://i.ibb.co/gvGqwG5/mist.png'
    };

    const weatherMain = response.data.condition.text || 'Unknown Weather';
    let iconUrl = weatherIcons[weatherMain] || 'https://i.ibb.co/R7rNsGd/cloud.png';

    
    cityElement.innerHTML = response.data.city;
    currentDateELement.innerHTML = formatDate(currentDate);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
    imageElement.src = iconUrl;
  
  }
  
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
  
  function searchCity(city) {
    let apiKey = "29ca9b932a2508dt10ce6d3564ofaf97";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
  
    searchCity(searchInput.value);
  }
  
 let searchButtonElement = document.getElementById('bx-search');
  searchButtonElement.addEventListener("click", handleSearchSubmit);
  
  searchCity("Randfontein");
