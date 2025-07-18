window.addEventListener("DOMContentLoaded", () => {
  const getWeatherBtn = document.getElementById("getWeather");
  const status = document.getElementById("status");
  const weatherDiv = document.getElementById("weather");
  const codeInput = document.getElementById("codeInput");

  getWeatherBtn.addEventListener("click", () => {
    const code = codeInput.value.trim();
    const delay = (code === "ultrafast") ? 0 : 15000;

    getWeatherBtn.disabled = true;
    getWeatherBtn.innerText = "取得中...";
    status.innerText = `位置情報を取得しています…（${delay / 1000}秒後に取得）`;

    navigator.geolocation.getCurrentPosition((pos) => {
      setTimeout(async () => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          const rain = data.rain?.["1h"] || 0;
          const chance = (rain * 10).toFixed(1);

          weatherDiv.innerHTML = `
            🌡 気温: ${data.main.temp}℃<br>
            ☁ 天気: ${data.weather[0].description}<br>
            🌧 降水量: ${rain}mm<br>
            🌩 ゲリラ豪雨確率: ${chance}%
          `;
          status.innerText = "✅ 天気取得完了";
        } catch (err) {
          console.error(err);
          status.innerText = "❌ 天気取得失敗";
        } finally {
          getWeatherBtn.disabled = false;
          getWeatherBtn.innerText = "天気を取得";
        }
      }, delay);
    }, () => {
      status.innerText = "❌ 位置情報の取得に失敗しました";
      getWeatherBtn.disabled = false;
      getWeatherBtn.innerText = "天気を取得";
    });
  });
});
