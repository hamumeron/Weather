
// OpenWeatherMap APIキー
const API_KEY = "c37cfe80d0c4b9342e39b09b2c2112af";

// 固定コード
const FIXED_CODE = "ultrafast";

// ランダムコード（起動時に1度だけ生成）
const RANDOM_CODE = generateRandomCode(8);

// ランダムコード生成関数
function generateRandomCode(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
