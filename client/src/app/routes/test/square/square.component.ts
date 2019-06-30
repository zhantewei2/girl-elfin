import { Component, OnInit } from '@angular/core';
import {NativePage} from "@native";
import {UIService} from "@nzx/service/ui.service";

/***
 * 添加路由缓存。
 */
@NativePage({
  cacheKey:"test-square-component",
})
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  constructor(
    public ui:UIService
  ){}
  navTo(){
    this.nav(["test/shop-small"])
  }
  ngOnInit(){
    console.log("square:","ng on init");
  }
  cmOnReuse(){
    console.log("square:","reuse");
  }
  cmOnHide(){
    console.log("square:","hide")
  }
  cmOnBack(){
    console.log("square:","back");
  }
}
