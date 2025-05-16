// 取得單一 CSS 變數
export const getCssVar = (varName: string): string => {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim() || ''
  } catch (error) {
    console.error(`Error getting CSS variable --${varName}:`, error)
    return ''
  }
}

// 設定單一 CSS 變數
export const setCssVar = (varName: string, value: string) => {
  try {
    document.documentElement.style.setProperty(`--${varName}`, value)
  } catch (error) {
    console.error(`Error setting CSS variable --${varName}:`, error)
  }
}

// 取得所有 CSS 變數
export const getAllCssVar = () => {
  try {
    const cssVars: Record<string, string> = {}
    const styles = getComputedStyle(document.documentElement)
    for (let i = 0; i < styles.length; i++) {
      const name = styles[i]
      cssVars[name] = styles.getPropertyValue(name)
    }
    return cssVars
  } catch (error) {
    console.error('Error getting all CSS variables:', error)
    return {}
  }
}
