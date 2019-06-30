import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';
import { SelfMainComponent } from './self-main/self-main.component';
import {NzxModule} from "@nzx/index";
import { ChatComponent } from './chat/chat.component';

const routes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"registry",component:RegistryComponent},
  {path:"main",component:SelfMainComponent},
  {path:"chat",component:ChatComponent}
];

@NgModule({
  declarations: [LoginComponent, RegistryComponent, SelfMainComponent, ChatComponent],
  imports: [
    CommonModule,
    NzxModule,
    RouterModule.forChild(routes)
  ]
})
export class SelfModule{}
