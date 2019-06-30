const {switchPort} =require('../tool/port');
const {SocketPort,FrontendPort} =require('../resources/setting');
const {join} =require('../tool/tool');
const SocketApp =require('./socket/socket');
const MyElectron=require('./myElectron');

const run=async()=>{
  const socketPort=await switchPort(SocketPort);
  const frontendPort= await switchPort(FrontendPort);
  const wins={};

  const socketApp=new SocketApp(socketPort,wins);

  const myElectron=new MyElectron(frontendPort,wins);


};


run();