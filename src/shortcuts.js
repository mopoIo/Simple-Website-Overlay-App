const { globalShortcut } = require('electron')

function setupShortcuts(mainWindow, store) {
  const toggleWindowVisibility = () => {
    if (!mainWindow) return true
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    return true
  }

  const hotkey = store.get('hotkey')
  globalShortcut.register(hotkey, toggleWindowVisibility)
}

module.exports = { setupShortcuts }