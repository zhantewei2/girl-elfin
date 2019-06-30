import { Component, OnInit } from '@angular/core';
import {StateService} from "@services/state.service";
import {mainSearch} from "../../../page-animate";

@Component({
  selector: 'app-self-main',
  templateUrl: './self-main.component.html',
  styleUrls: ['./self-main.component.scss'],
  animations:[mainSearch]
})
export class SelfMainComponent implements OnInit {

  constructor(
    private state:StateService
  ) { }
  beginNext:boolean=false;
  ngOnInit(){}
  next(){
    this.beginNext=true;
    // this.state.mode.next();
  }
  anDone(){
    if(this.beginNext)this.state.mode.next();
  }
}
