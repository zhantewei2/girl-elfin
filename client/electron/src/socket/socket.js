const {name}=require('../../resources/setting');
const socketController=require('./controller/socket-controller');
const uiController=require('./controller/ui-controller');
const messageController=require('./controller/message-controller');

module.exports=class SocketApp{

  constructor(port,wins={}){
    this.wins=wins;
    const app=require('http').createServer((req,res)=>res.end('end'));
    this.io=require('socket.io')(app);
    this.io.on("connection",socket=>{
      socket.on('data',e=>{
        try{
          switch(e.type){
            case "ui":
              uiController(e.content,socket,this.wins);
              break;
            case "message":
              messageController(e.content,socket,this.wins);
              break;
          }
        }catch(e){
          console.error('err');
        }
      });
    });

    app.listen(port);
  }
};
