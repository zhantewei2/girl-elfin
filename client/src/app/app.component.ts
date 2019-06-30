import {Component,OnInit,ViewContainerRef} from '@angular/core';
import {HttpService} from "@services/http.service";
import {NativeRouterService} from "@native/router.service";
import {NativePage} from "@native";
import {SocketService} from "@services/socket.service";
import {StateService} from "@services/state.service";


@NativePage()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app1';
  constructor(
    public http:HttpService,
    public nativeRouter:NativeRouterService,
    public socket:SocketService,
    private state:StateService
  ){}
  value:string;
  ngOnInit(){
    this.nav(['self/main'])
  }
  send(){
    this.socket.emitUi("hello");
  }
  pageBack(){
    this.state.mode.back();
  }
}
