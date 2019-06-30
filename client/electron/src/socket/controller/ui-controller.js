const {mainWindow}=require('../../../resources/setting');

module.exports=(content,socket,wins)=>{
  const main=wins['main']['win'];
  try {
    switch (content) {
      case "frameClose":
        main.hide();
        break;
      case "frameMin":
        main.minimize();
        break;
      case "frameMax":
        // main.isMaximized()?main.unmaximize():main.maximize();
        break;
      case "frameNext":
        main.setSize(mainWindow.w2,mainWindow.h2,true);
        main.setHasShadow(true);
        break;

      case "frameBack":
        main.setSize(mainWindow.w,mainWindow.h,true);
        main.setHasShadow(false);
        break;
    }
  }catch(e){
    console.log(e)
  }
};