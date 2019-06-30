import { Component, OnInit } from '@angular/core';
import {NativePage} from "@native";

@NativePage()
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(){}

}
