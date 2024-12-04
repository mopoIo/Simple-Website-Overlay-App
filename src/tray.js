const { Tray, Menu } = require('electron')
const path = require('path')
const { promptForUrl, promptForHotkey } = require('./dialogs')

function setupTray(mainWindow, store) {
  const tray = new Tray(path.join(__dirname, '../icon.ico'))
  
  function setOpacity(value) {
    if (mainWindow) {
      mainWindow.setOpacity(value)
      store.set('opacity', value)
    }
  }

  function toggleWindowVisibility() {
    if (!mainWindow) return
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Toggle Overlay (${store.get('hotkey')})`,
      click: toggleWindowVisibility
    },
    {
      label: 'Opacity',
      submenu: [
        { label: '25%', type: 'radio', checked: store.get('opacity') === 0.25, click: () => setOpacity(0.25) },
        { label: '50%', type: 'radio', checked: store.get('opacity') === 0.50, click: () => setOpacity(0.50) },
        { label: '75%', type: 'radio', checked: store.get('opacity') === 0.75, click: () => setOpacity(0.75) },
        { label: '100%', type: 'radio', checked: store.get('opacity') === 1, click: () => setOpacity(1) }
      ]
    },
    { type: 'separator' },
    {
      label: 'Change URL',
      click: () => promptForUrl(store, mainWindow)
    },
    {
      label: 'Change Hotkey',
      click: () => promptForHotkey(store)
    },
    { type: 'separator' },
    {
      label: 'Exit',
      click: () => require('electron').app.quit()
    }
  ])
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Overlay App')
  tray.on('double-click', toggleWindowVisibility)

  return tray
}

module.exports = { setupTray }