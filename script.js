let delay = 15000; // 初期状態：15秒待機

window.addEventListener("DOMContentLoaded", () => {
  const getWeatherBtn = document.getElementById("getWeather");
  const status = document.getElementById("status");
  const weatherDiv = document.getElementById("weather");
  const codeInput = document.getElementById("codeInput");

  getWeatherBtn.addEventListener("click", () => {
    const code = codeInput.value.trim();

    // コード判定 → delay 設定
    if (code === "ultrafast") {
      delay = 0;
      status.innerText = "🚀 高速モード（即取得）で動作します";
    } else {
      delay = 15000;
      status.innerText = `⏳ 通常モード（${delay / 1000}秒待機）で取得します`;
    }

    getWeatherBtn.innerText = "取得中...";
    getWeatherBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      status.innerText += "\n📍 位置情報取得成功";

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
          status.innerText += "\n✅ 天気取得完了！";
        } catch (e) {
          console.error(e);
          status.innerText = "❌ API取得に失敗しました";
        } finally {
          getWeatherBtn.innerText = "天気を取得";
          getWeatherBtn.disabled = false;
        }
      }, delay);
    }, () => {
      status.innerText = "❌ 位置情報の取得に失敗しました";
      getWeatherBtn.innerText = "天気を取得";
      getWeatherBtn.disabled = false;
    });
  });
});
