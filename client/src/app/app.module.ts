import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {RoutesModule} from "./routes/routes.module";
import {NzxModule} from "@nzx/index";
import "./native/types";
import {NativeRouterService} from "./native/router.service";
import {ServiceModule} from "./services/service.module";
import {ShareModule} from "./share/share.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NzxModule,
    BrowserModule,
    FormsModule,
    RoutesModule,
    BrowserAnimationsModule,
    ServiceModule,
    ShareModule
  ],
  providers: [
    NativeRouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
