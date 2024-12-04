const { screen } = require('electron')

function setupWebContent(window) {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().bounds
  const scaleX = screenWidth / 1920
  const scaleY = screenHeight / 1080
  const scale = Math.max(scaleX, scaleY)
  
  const translateX = (screenWidth - (1920 * scale)) / 2
  const translateY = (screenHeight - (1080 * scale)) / 2

  window.webContents.insertCSS(`
    body {
      margin: 0 !important;
      padding: 0 !important;
      transform: scale(${scale}) translate(${translateX/scale}px, ${translateY/scale}px);
      transform-origin: top left;
      background: transparent !important;
      width: 1920px !important;
      height: 1080px !important;
    }
    html, body {
      background: transparent !important;
      background-color: transparent !important;
      overflow: hidden !important;
    }
  `)
  
  window.show()
}

module.exports = { setupWebContent }