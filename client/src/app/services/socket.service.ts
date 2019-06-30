import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(){
    this.socket=window.socket;
  }
  nextMode:boolean;
  socket:any;
  emitUi=(message:any)=>{
    this.socket.emit('data',{type:"ui",content:message});
  };

  emitMessage=(message:any)=>{
    this.socket.emit('data',{type:"message",content:message});
  }

}
