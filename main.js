
const { app, BrowserWindow, globalShortcut } = require('electron');
const localShortcut = require('electron-localshortcut');

function createWindow () {
  // 브라우저 창 생성
  const win = new BrowserWindow({
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  globalShortcut.register('Control+Q', () => {
    console.log('Control+Q is pressed');
  });

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    console.log('CommandOrControl+Shift+I is pressed')
  })

  // Disable 'Ctrl+Q'
  localShortcut.unregister(win, 'Ctrl+Q');

  // Disable all shortcuts
  localShortcut.unregisterAll(win);

  // Prevent app from automatically quitting when last window is closed
  app.on('window-all-closed', function (e) {
    e.preventDefault();
  });

  // Prevent app from quitting when 'Alt + F4' is pressed
  app.on('before-quit', function (e) {
    e.preventDefault();
  });

  win.on('close', function (e) {
    e.preventDefault();
  });

  // localhost:3000 로드
  win.loadURL('http://localhost:3000');
  win.maximize();
  win.setMenuBarVisibility(false);
  win.fullScreen = true;
  win.fullScreenable = false;
  win.setResizable(false);
  win.setAlwaysOnTop(true);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister the shortcut before the app is quitting
  globalShortcut.unregister('Control+Q')
});