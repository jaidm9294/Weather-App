const apiKey = 'a8e71c9932b20c4ceb0aed183e6a83bb'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherDisplay = document.getElementById('weatherDisplay');
    
    if (!city) {
        weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            weatherDisplay.innerHTML = '<p>City not found. Please try again.</p>';
            return;
        }

        const weather = data.weather[0];
        const temperature = data.main.temp;
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <img src="${iconUrl}" alt="${weather.description}" class="weather-img">
            <p><strong>${weather.main}</strong>: ${weather.description}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
}
