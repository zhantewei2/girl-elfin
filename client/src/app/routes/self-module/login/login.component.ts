import { Component, OnInit } from '@angular/core';
import {NativePage} from "@native";

@NativePage({
  cacheKey:"loginComponent"
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  back(){
    this.back();
  }
  ngOnInit(){
    console.log("loginInit")
  }
}
