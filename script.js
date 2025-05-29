async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "7c5ffb0068c8b65392c8ddb93949bb88"; // ← Replace with your actual API key
    const messageEl = document.getElementById("message");
    const weatherEl = document.getElementById("weatherInfo");
  
    if (!city) {
      messageEl.textContent = "Please enter a city name.";
      messageEl.className = "error";
      weatherEl.innerHTML = "";
      return;
    }
  
    messageEl.textContent = "Loading...";
    messageEl.className = "loading";
    weatherEl.innerHTML = "";
  
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found.");
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }
  
      const data = await response.json();
      messageEl.textContent = "";
      weatherEl.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.main.temp}°C - ${data.weather[0].description}</p>
      `;
  
      localStorage.setItem("lastCity", city);
    } catch (err) {
      messageEl.textContent = err.message;
      messageEl.className = "error";
    }
  }
  
  window.onload = () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      document.getElementById("cityInput").value = lastCity;
      getWeather();
    }
  };
  