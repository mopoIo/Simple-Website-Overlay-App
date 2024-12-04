const { BrowserWindow, screen } = require('electron')
const { promptForUrl } = require('./dialogs')
const { setupWebContent } = require('./webContent')

function createWindow(store) {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth, height: screenHeight } = primaryDisplay.bounds

  const window = new BrowserWindow({
    width: screenWidth,
    height: screenHeight,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    focusable: false,
    backgroundColor: '#00000000',
    fullscreen: true,
    kiosk: true,
    skipTaskbar: true,
    show: false,
    type: 'toolbar',
    opacity: store.get('opacity')
  })

  const currentUrl = store.get('url')
  if (currentUrl) {
    window.loadURL(currentUrl)
  } else {
    promptForUrl(store, window)
  }
  
  window.setIgnoreMouseEvents(true)
  window.webContents.setAudioMuted(true)
  window.webContents.on('did-finish-load', () => setupWebContent(window))

  return window
}

module.exports = { createWindow }