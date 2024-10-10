const apiKey = "da17e7241a82eeb5df6ee7dc849e73c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
let isCelsius = true;

document.getElementById('search-button').addEventListener('click', getWeather);
document.getElementById('unit-toggle').addEventListener('click', toggleUnits);

function getWeather() {
    const city = document.getElementById('city-input').value;
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=${isCelsius ? 'metric' : 'imperial'}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)} °${isCelsius ? 'C' : 'F'}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} ${isCelsius ? 'm/s' : 'mph'}`;
    document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-result').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function displayError(message) {
    document.getElementById('error-message').innerText = message;
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-result').classList.add('hidden');
}

function toggleUnits() {
    isCelsius = !isCelsius;
    document.getElementById('unit-toggle').innerText = isCelsius ? 'Toggle °C/°F' : 'Toggle °F/°C';
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather();
    }
}
