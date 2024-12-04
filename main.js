const { app, ipcMain, globalShortcut } = require('electron')
const { createWindow } = require('./src/window')
const { setupTray } = require('./src/tray')
const { setupShortcuts } = require('./src/shortcuts')
const Store = require('electron-store')

const store = new Store()
let mainWindow = null
let tray = null

// Initialize default settings
if (!store.get('hotkey')) store.set('hotkey', 'F24')
if (!store.get('url')) store.set('url', '')
if (!store.get('opacity')) store.set('opacity', 0.5)

// Handle URL changes
ipcMain.on('set-url', (event, newUrl) => {
  store.set('url', newUrl)
  if (mainWindow) {
    mainWindow.loadURL(newUrl)
  }
})

// Handle hotkey changes
ipcMain.on('set-hotkey', (event, newHotkey) => {
  const currentHotkey = store.get('hotkey')
  // Unregister old hotkey
  globalShortcut.unregister(currentHotkey)
  
  // Register new hotkey
  store.set('hotkey', newHotkey)
  globalShortcut.register(newHotkey, () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
    return true
  })
  
  // Update tray - destroy old one first
  if (tray) {
    tray.destroy()
  }
  tray = setupTray(mainWindow, store)
})

app.whenReady().then(() => {
  mainWindow = createWindow(store)
  tray = setupTray(mainWindow, store)
  setupShortcuts(mainWindow, store)
})

app.on('will-quit', () => {
  if (tray) {
    tray.destroy()
  }
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', (e) => {
  e.preventDefault()
})

app.on('activate', () => {
  if (require('electron').BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow(store)
  }
})