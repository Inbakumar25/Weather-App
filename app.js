const apiKey = '9505fd1df737e20152fbd78cdb289b6a'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

const cityInput = document.getElementById('cityInput');
const weatherForm = document.getElementById('weatherForm');
const voiceButton = document.getElementById('voiceButton');

const cityNameElement = document.getElementById('cityName');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const cloudsElement = document.getElementById('clouds');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');

// Voice Recognition Setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

voiceButton.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const cityName = event.results[0][0].transcript.trim();
    cityInput.value = cityName; // Autofill the text box with recognized city name
};

// Fetch Weather Data
function fetchWeather(city) {
    fetch(`${apiUrl}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                cityNameElement.textContent = data.name + ', ' + data.sys.country;
                tempElement.textContent = Math.round(data.main.temp);
                descriptionElement.textContent = data.weather[0].description;
                cloudsElement.textContent = data.clouds.all + '%';
                humidityElement.textContent = data.main.humidity + '%';
                pressureElement.textContent = data.main.pressure + ' hPa';
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Form Submission Handler
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cityName = cityInput.value.trim();
    
    if (cityName) {
        fetchWeather(cityName);
        cityInput.value = ''; // Clear input field after search
    } else {
        alert('Please enter a city name.');
    }
});
