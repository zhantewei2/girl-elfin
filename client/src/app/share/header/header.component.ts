import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {SocketService} from "@services/socket.service";
import {backBtn} from "../../page-animate";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:{
    class:"host"
  },
  animations:[backBtn]
})
export class HeaderComponent implements OnInit {

  constructor(
    private socket:SocketService
  ) { }
  ngOnInit(){}
  @Input()next:boolean;
  @Output('back')back:EventEmitter<void>=new EventEmitter<void>();
  toBack(){
    this.back.emit();
  }
  close(){
    this.socket.emitUi("frameClose");
  }
  min(){
    this.socket.emitUi("frameMin");
  }
  max(){
    this.socket.emitUi("frameMax");
  }

}
