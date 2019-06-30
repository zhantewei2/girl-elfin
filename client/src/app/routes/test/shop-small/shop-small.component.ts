import { Component, OnInit } from '@angular/core';
import {NativePage} from "@native";

@NativePage()
@Component({
  selector: 'app-shop-small',
  templateUrl: './shop-small.component.html',
  styleUrls: ['./shop-small.component.scss']
})
export class ShopSmallComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  cmOnBack() {
    console.log("shop-small-component: ","router back")
  }
}
