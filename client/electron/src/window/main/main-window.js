const {app,BrowserWindow,ipcMain,Menu,Tray} =require("electron");
const {mainWindow} =require('../../../resources/setting');

const url=require('url');

module.exports=class MainWindow{

  constructor(frontEndPort) {
    this.frontEndPort=frontEndPort;
    this.createWin();
    this.loadBrowser();
  }
  loadBrowser(){
    this.win.loadURL(url.format({
        pathname: `localhost:${this.frontEndPort}`,
        protocol: 'http:',
        slashes: true
      })
    );
  }


  createWin(){
    this.win=new BrowserWindow({
      width: mainWindow.w,
      height: mainWindow.h,
      frame: false,
      // icon: join('public/1.ico'),
      title: 'ztwApp',
      transparent:true,
      // titleBarStyle:"hiddenInset"
    });
    this.win.setResizable(false);
    this.win.setHasShadow(false);
  }
};