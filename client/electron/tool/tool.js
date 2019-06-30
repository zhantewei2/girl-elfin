const fs=require('fs');
const path=require('path');
const hostPath=path.resolve(__dirname,'../');


exports.join=(...args)=>path.join(hostPath,...args);