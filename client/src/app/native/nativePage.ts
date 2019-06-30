import {Component} from "@angular/core";
import {ChildRoute} from "./router.service";
import {cacheManage} from "@nzx/tool/router-reuse";

export class NativePageConfig{
  cacheKey?:string;
  keepScrollElement?:string;
}


export const NativePage=(config:NativePageConfig={})=>
  (target:Object)=>{
    const {cacheKey,keepScrollElement}=config;
    const oldInit:any=target.prototype.ngOnInit;
    const init=function(){
      const routeInject:ChildRoute=new ChildRoute();
      ["nav","replace","addDump","clearDump","dump","replace","back"].forEach((i:string)=>
        target.prototype[i]=(...args:any)=>routeInject[i].call(routeInject,...args)
      );
      const order=routeInject.backSubject.subscribe(()=>{
        this.cmOnBack&&this.cmOnBack();
        cacheKey&&cacheManage.detachCacheRouter(cacheKey);
        order.unsubscribe();
      });
      this.$cmRouteInject=routeInject;
      oldInit.call(this);
    };

    target.prototype.ngOnInit=init;
    target.cmCacheKey=cacheKey;
    target.cmScrollElement=keepScrollElement;
};




