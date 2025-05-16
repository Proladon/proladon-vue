const config = {
  BACKEND_HOST: '$VITE_BACKEND_HOST',
  IMG_SERVER_HOST: '$VITE_IMG_SERVER_HOST',
  VITE_PORT: '$VITE_PORT',
  THEME_PREFIX: '$VITE_THEME_PREFIX',
  RUNTIME: '$VITE_RUNTIME'
  // 自訂名稱: ’$ + .env變數名稱'
}

const env = process.env.NODE_ENV

// 代入與替換
export default (name) => {
  if (!(name in config)) {
    return
  }

  const value = config[name]
  if (!value) {
    return
  }

  // 搜尋前綴為 $VITE_ 開頭的Value 並代入替換 .env 對應的值
  if (value.startsWith('$VITE_')) {
    const envName = value.substr(1)
    let envValue = import.meta.env[envName]
    if (envValue) {
      // 如果是 e2e 環境，則使用 VITE_E2E_BACKEND_HOST 替換 VITE_BACKEND_HOST
      if (envName === 'VITE_BACKEND_HOST') {
        if (env === 'e2e') envValue = process.env.VITE_E2E_BACKEND_HOST
      }
      envValue = envValue.replace(/\\n/g, '\n')

      // 轉換成真正的布林值
      envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue
      return envValue
    }
  } else {
    return value
  }
}
