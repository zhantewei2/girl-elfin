import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NzxModule} from "@nzx/index";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzxModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class ShareModule { }
