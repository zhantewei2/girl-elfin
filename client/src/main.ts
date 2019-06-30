import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment,optional } from './environments/environment';
import {loadJs} from "./app/tool/loadJs";


declare var VConsole:any;
declare var io:any;
const socketPort=4001;

if (environment=="production"){
  enableProdMode();
}
const win:any=window;
const bootstrap=async()=>{
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

const preLoad=async()=>{
  if(optional.vConsole){
    await loadJs("assets/lib/vconsole.min.js");
    new VConsole();
  }
};
const switchEnv=async()=>{
  if(environment=="devWeb"){
    return;
  }else{
    if(win.cordovaReady)return;
    await new Promise((resolve,reject)=>document.addEventListener("deviceready",resolve));
  }
};

const connectSocket=()=>new Promise((resolve,reject)=>{
  const script = document.createElement("script");
  script.src = `http://localhost:${socketPort}/socket.io/socket.io.js`;
  script.onload=()=>{
    const socket=io(`http://localhost:${socketPort}`);
    socket.on('connect',resolve);
    window.socket=socket;
  };
  document.body.appendChild(script);
});



const run=async()=>{
  await preLoad();
  // await switchEnv();
  await connectSocket();
  await bootstrap();
  console.log("initial end")
};

run();
