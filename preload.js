const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setUrl: (url) => ipcRenderer.send('set-url', url),
  setHotkey: (hotkey) => ipcRenderer.send('set-hotkey', hotkey)
})