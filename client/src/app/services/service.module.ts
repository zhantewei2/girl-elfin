import {NgModule} from '@angular/core';
import {RouterReuse} from "@nzx/tool/router-reuse";
import {RouteReuseStrategy} from "@angular/router";

@NgModule({
  providers:[
    {
      provide:RouteReuseStrategy,
      useClass:RouterReuse
    }
  ]
})
export class ServiceModule{

}
