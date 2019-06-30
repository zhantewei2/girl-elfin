const {app,BrowserWindow,ipcMain,Menu,Tray} =require("electron");
const ulr=require('url');
const MainWindow=require('./window/main/main-window');




module.exports=class MyElectron{

  constructor(frontEndPort,wins){
    this.mainWin=null;
    this.chatWin=null;

    const createMain=()=>{
      this.mainWin=new MainWindow(frontEndPort);
      wins['main']=this.mainWin;
    };

    app.on('ready',()=>{
      createMain();
    });

    app.on('activate',()=>{
      if(this.mainWin===null)createMain();
      wins['main']['win'].show();
    })

  }

};