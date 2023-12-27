
const { app, BrowserWindow, globalShortcut, dialog } = require('electron');
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
    console.log('CommandOrControl+Shift+I is pressed');
  });
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

  const fs = require('fs');
  const path = require('path');

  const configPath = (__dirname) ? path.join(__dirname, 'config.json') : path.join(process.execPath, '../config.json');
  // console.log(configPath);
  // configPath를 사용자에게 alert로 보여주기
  // dialog.showMessageBoxSync({message:'configPath: ' + configPath});
  let configFile;
  if (fs.existsSync(configPath)) { // 파일이 있으면
    configFile = fs.readFileSync(configPath).toString();
  } else { // 파일이 없으면
    // configFile = fs.readFileSync(path.join(__dirname, 'config.json')).toString();
    fs.writeFileSync(configPath, JSON.stringify({
      url: 'http://localhost:3000'
    }));
    configFile = fs.readFileSync(configPath).toString();
  }
  const config = JSON.parse(configFile);
  // dialog.showMessageBoxSync({message:'config: ' + JSON.stringify(config)});

  // localhost:3000 로드
  win.loadURL(config.url);
  // win.loadURL('http://localhost:3000');
  win.maximize();
  win.setMenuBarVisibility(false);
  //win.fullScreen = true;
  //win.fullScreenable = false;
  //win.setResizable(false);
  //win.setAlwaysOnTop(true);
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