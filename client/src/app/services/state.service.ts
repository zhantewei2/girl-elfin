import { Injectable } from '@angular/core';
import {SocketService} from "./socket.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private socket:SocketService,
    private router:Router,
    private location:Location
  ){}
  mode:any={
    next:()=>{
      this.socket.emitUi("frameNext");
      this.socket.nextMode=true;
      this.router.navigate(['/self/chat']);
    },
    back:()=>{
      this.socket.emitUi("frameBack");
      this.socket.nextMode=false;
      this.location.back();
    }
  }

}
