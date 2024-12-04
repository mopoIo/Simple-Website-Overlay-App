# 🖥️ Simple Website Overlay App

Display any website as a transparent, click-through overlay on your screen. I made this for a specific case scenario so all windows are scaled to 1920x1080 and then expanded to your actual screen size.
If you have a Stream Deck, I suggest adding a 'Hotkey' button and bind it to an odd function-key like F24

## ✨ Features

- 🌐 Load any website as an overlay
- 🔍 Adjustable transparency levels (25% - 100%)
- ⌨️ Customizable hotkey for quick toggling
- 🎯 Click-through functionality - won't interfere with other windows
- 📌 Always-on-top capability
- 🎚️ Easy controls via system tray
- 💾 Automatic settings persistence
- 📐 Smart scaling to maintain aspect ratio

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-website-overlay-app.git
cd simple-website-overlay-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

## 📖 How to Use

### First Launch
1. When you first start the app, you'll be prompted to enter a website URL
2. Default hotkey is set to F24
3. Default opacity is set to 50%

### Controls
- **🔄 Toggle Overlay**: Press your configured hotkey (default: F24)
- **🔗 Change URL**: Right-click tray icon → Change URL
- **⌨️ Change Hotkey**: Right-click tray icon → Change Hotkey
- **�밝 Adjust Opacity**: Right-click tray icon → Opacity
- **❌ Exit**: Right-click tray icon → Exit

### System Tray
The app runs quietly in your system tray. Double-click the tray icon to toggle the overlay.

## 🛠️ Technical Details

### Project Structure
```
├── src/
│   ├── dialogs.js     # URL and hotkey prompts
│   ├── shortcuts.js   # Global shortcuts
│   ├── tray.js       # System tray menu
│   ├── webContent.js # Content scaling
│   └── window.js     # Main window setup
├── main.js           # Entry point
├── preload.js        # IPC bridge
└── package.json
```

### Configuration
Settings are automatically saved between sessions:
- `url`: Overlay website URL
- `hotkey`: Toggle shortcut key
- `opacity`: Window transparency

## 🔧 Development

To build for distribution:
```bash
npm run build
```

## 📝 License

[MIT License](LICENSE)

## 💡 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## 🐛 Found a Bug?

Please open an issue with:
- Expected behavior
- Actual behavior
- Steps to reproduce

---

Made with ❤️ using Electron
