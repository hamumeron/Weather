let delay = 15000;

window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const codeInput = document.getElementById("codeInput");
  const getWeatherBtn = document.getElementById("getWeather");
  const status = document.getElementById("status");
  const weatherDiv = document.getElementById("weather");

  // ✅ モーダル開く
  openModalBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    codeInput.focus();
  });

  // ✅ モーダル閉じる
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // ✅ 限定コード入力処理
  codeInput.addEventListener("input", () => {
    const code = codeInput.value.trim();
    if (code === "ultrafast") {
      delay = 0;
      status.innerText = "🚀 高速モードが有効になりました（即時取得）";
    } else {
      delay = 15000;
      status.innerText = "";
    }
  });

  // ✅ 天気を取得
  getWeatherBtn.addEventListener("click", () => {
    getWeatherBtn.innerText = "取得中...";
    getWeatherBtn.disabled = true;

    status.innerText = "📍 位置情報を取得中...";
    navigator.geolocation.getCurrentPosition(async (pos) => {
      status.innerText = `🌤 天気情報を${delay / 1000}秒後に取得します...`;

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
          status.innerText = "✅ 天気取得完了！";
        } catch (e) {
          console.error(e);
          status.innerText = "❌ API取得に失敗しました";
          weatherDiv.innerHTML = "";
        } finally {
          getWeatherBtn.innerText = "天気を取得";
          getWeatherBtn.disabled = false;
        }
      }, delay);
    }, () => {
      status.innerText = "❌ 位置情報が取得できませんでした";
      getWeatherBtn.innerText = "天気を取得";
      getWeatherBtn.disabled = false;
    });
  });
});
