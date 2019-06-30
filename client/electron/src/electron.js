const {app,BrowserWindow,ipcMain,Menu,Tray} =require("electron");


let mainWindow;
function createWindow () {
  // Create the browser window.
  global._mainWin = mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: join('public/1.ico'),
    title: 'ztwApp',
    transparent: true
  })
}

mainWindow.loadURL(url.format({
  pathname: 'localhost:8080',
  protocol: 'http:',
  slashes: true
}));

// Open the DevTools.
// mainWindow.webContents.openDevTools()

// Emitted when the window is closed.
mainWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow = null
})
}

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
});



// app.on('ready',()=>{
//   createWindow();
//   require('./src/createTray.js');
// });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});