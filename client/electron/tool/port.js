const http=require('http');

module.exports.switchPort=(port)=>{
  return new Promise((resolve,reject)=>{
    const app=http.createServer((req,res)=>{
      res.end('end')
    });
    app.on('error',()=>{
      switchPort(port+1).then(resolve)
    });
    app.on('listening',()=>{
      app.close();
      resolve(port)
    });
    app.listen(port)
  })
};