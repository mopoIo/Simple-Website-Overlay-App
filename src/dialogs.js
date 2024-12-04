const { BrowserWindow } = require('electron')
const path = require('path')

function promptForUrl(store, mainWindow) {
  const urlWindow = new BrowserWindow({
    width: 500,
    height: 200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js')
    },
    autoHideMenuBar: true,
    frame: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    minWidth: 400,
    minHeight: 200
  })

  const currentUrl = store.get('url')
  const htmlContent = encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Enter Overlay URL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 24px;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          
          h3 { 
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 600;
          }
          
          .input-group {
            display: flex;
            gap: 8px;
            width: 100%;
          }
          
          .input-wrapper {
            position: relative;
            flex-grow: 1;
          }
          
          input { 
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.2s ease;
          }
          
          input:focus {
            outline: none;
            border-color: #2196F3;
            box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
          }
          
          button {
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 44px;
          }
          
          .toggle-visibility {
            background: #f0f0f0;
            color: #666;
          }
          
          .toggle-visibility:hover {
            background: #e0e0e0;
          }
          
          .save-button {
            background: #2196F3;
            color: white;
            margin-left: auto;
          }
          
          .save-button:hover {
            background: #1976D2;
          }

          .icon {
            width: 16px;
            height: 16px;
            fill: currentColor;
          }
        </style>

        <div class="container">
          <h3>Enter Overlay URL</h3>
          <div class="input-group">
            <div class="input-wrapper">
              <input 
                type="password" 
                id="url" 
                value="${currentUrl || ''}" 
                placeholder="https://your-overlay-url.com"
                spellcheck="false"
                autocomplete="off"
              >
            </div>
            <button class="toggle-visibility" id="toggleVisibility" title="Toggle visibility">
              <svg class="icon" viewBox="0 0 24 24" id="visibilityIcon">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
          <button class="save-button" onclick="submit()">Save</button>
        </div>

        <script>
          let isVisible = false;
          const urlInput = document.getElementById('url');
          const toggleButton = document.getElementById('toggleVisibility');
          const visibilityIcon = document.getElementById('visibilityIcon');

          function toggleVisibility() {
            isVisible = !isVisible;
            urlInput.type = isVisible ? 'text' : 'password';
            visibilityIcon.innerHTML = isVisible 
              ? '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
              : '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
          }

          function submit() {
            const url = urlInput.value.trim();
            if (url) {
              window.electronAPI.setUrl(url);
            }
          }

          toggleButton.addEventListener('click', toggleVisibility);
          urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') submit();
          });
        </script>
      </body>
    </html>
  `)

  urlWindow.loadURL(`data:text/html;charset=UTF-8,${htmlContent}`)
  urlWindow.removeMenu()
}

function promptForHotkey(store) {
  const hotkeyWindow = new BrowserWindow({
    width: 400,
    height: 250,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js')
    },
    autoHideMenuBar: true,
    frame: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    minWidth: 300,
    minHeight: 250
  })

  const currentHotkey = store.get('hotkey')
  const htmlContent = encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Set Hotkey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 24px;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          h3 { 
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
          }
          
          #key { 
            font-size: 32px;
            font-weight: 600;
            padding: 20px 40px;
            background: #f8f8f8;
            border: 2px solid #2196F3;
            border-radius: 8px;
            min-width: 140px;
            text-align: center;
            color: #1a1a1a;
            transition: all 0.2s ease;
            user-select: none;
          }
          
          #key:empty:before {
            content: "${currentHotkey || 'F22'}";
            color: #666;
          }
          
          #instruction {
            font-size: 13px;
            color: #666;
            text-align: center;
          }
        </style>

        <div class="container">
          <h3>Press any key to set as hotkey</h3>
          <div id="key"></div>
          <div id="instruction">Press Esc to cancel</div>
        </div>

        <script>
          const keyDisplay = document.getElementById('key');
          
          document.addEventListener('keydown', (e) => {
            e.preventDefault();
            
            if (e.key === 'Escape') {
              window.close();
              return;
            }
            
            const key = e.key.toUpperCase();
            keyDisplay.textContent = key;
            window.electronAPI.setHotkey(key);
            // Close the window after a brief delay to show the key
            setTimeout(() => window.close(), 200);
          });
        </script>
      </body>
    </html>
  `)

  hotkeyWindow.loadURL(`data:text/html;charset=UTF-8,${htmlContent}`)
  hotkeyWindow.removeMenu()
}

module.exports = { promptForUrl, promptForHotkey }