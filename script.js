let delay = 15000;
const codeInput = document.getElementById("codeInput");
const status = document.getElementById("status");

codeInput.addEventListener("input", () => {
  if (codeInput.value === "ultrafast") {
    delay = 0;
    status.innerText = "🚀 高速モード有効化";
  } else {
    delay = 15000;
    status.innerText = "";
  }
});

navigator.geolocation.getCurrentPosition(async (position) => {
  setTimeout(async () => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

    const res = await fetch(url);
    const data = await res.json();
    const rain = data.rain ? data.rain["1h"] : 0;

    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = `
      🌡 気温: ${data.main.temp}℃<br>
      ☁ 天気: ${data.weather[0].description}<br>
      🌧 降水量: ${rain}mm<br>
      🌩 ゲリラ豪雨確率: ${(rain * 10).toFixed(1)}%
    `;
  }, delay);
});
