import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { SquareComponent } from './square/square.component';
import { ShopSmallComponent } from './shop-small/shop-small.component';
import {NzxModule} from "@nzx/index";
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [SquareComponent, ShopSmallComponent, IndexComponent],
  imports: [
    CommonModule,
    NzxModule,
    RouterModule.forChild([
      {path:"",component:IndexComponent},
      {path:"square",component:SquareComponent},
      {path:"shop-small",component:ShopSmallComponent}
    ])
  ]
})
export class TestModule { }
