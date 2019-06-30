import {RouteReuseStrategy,ActivatedRouteSnapshot,DetachedRouteHandle} from '@angular/router'
import {Injectable} from '@angular/core';

export interface HandleRef {
  handle: DetachedRouteHandle;
  scrollEl: HTMLElement;
  scroll: number;
  active?:boolean;
}


class CacheManage{
  routesToCache:string[]=[];
  storedRouteHandles:Map<string,HandleRef>=new Map<string,HandleRef>();
  appendCacheRouter=(key:string|string[])=>{
    const append=(k:string)=>this.routesToCache.indexOf(k)<0&&this.routesToCache.push(k);
    key instanceof Array?key.forEach(append):append(key);
  };
  detachCacheRouter=(key:string)=>{
    const index:number=this.routesToCache.indexOf(key);
    if(index>-1){
      this.routesToCache.splice(index,1);
      this.storedRouteHandles.delete(key);
    }
  };
  destroyStore=(key:string)=>this.storedRouteHandles.delete(key);
  clear=()=>{
    this.storedRouteHandles.clear();
    this.routesToCache=[];
  };
  shouldAttach=(key:string):boolean=>this.storedRouteHandles.has(key);
  shouldDetach=(key:string):boolean=>this.routesToCache.indexOf(key)>-1;
  setRoute=(key:string,value:HandleRef)=>this.storedRouteHandles.set(key,value);
  getRoute=(key:string):HandleRef=>this.storedRouteHandles.get(key);
}

export const cacheManage:CacheManage=new CacheManage();

@Injectable({
  providedIn:'root'
})
export class RouterReuse implements  RouteReuseStrategy{
  shouldRetrieve:boolean=false;
  constructor(

  ){}
  shouldDetach(route:ActivatedRouteSnapshot){
    if(!route.component)return;
    const key:string=route.component.cmCacheKey;
    return cacheManage.shouldDetach(key);
  }
  store(route:ActivatedRouteSnapshot,handle:any){
    if(!route.component)return;
    const key:string=route.component.cmCacheKey;
    if(!key)return;
    let
      scroll:number,
      scrollEl:HTMLElement;
    //退出时触发带handle，进入也触发，但不带handle
    if(handle){
      const component:any=handle.componentRef.instance;
      try{
        if(route.data.scroll) {
          scrollEl=component[route.data.scroll];
          scroll=scrollEl.scrollTop;
          if(scroll!=0){
            scrollEl.style.opacity='0';
          }
        }
      }catch(e){
        console.warn(e);
      }
      cacheManage.setRoute(key,{handle,scroll,scrollEl,active:false});
      component.cmOnHide&&component.cmOnHide();
    }
  }
  shouldAttach(route:ActivatedRouteSnapshot):boolean{
    const key:string=(route.component as any).cmCacheKey;
    cacheManage.appendCacheRouter(key);
    return cacheManage.shouldAttach(key);
  }
  retrieve(route :ActivatedRouteSnapshot):DetachedRouteHandle{
    //This method will trigger twice without rhyme or reason;
    if(!route.component)return;
    const key:string=(route.component as any).cmCacheKey;
    if(!key)return;
    const handleRef:HandleRef=route.data&&cacheManage.getRoute(key);
    if(!handleRef)return;
    //So this process ensures that it only triggers once!
    const component=(handleRef.handle as any).componentRef.instance;
    //component cm life hook!
    if(!handleRef.active) {
      component.cmOnReuse && component.cmOnReuse();
      if (handleRef.scroll && handleRef.scrollEl) {
        setTimeout(() => {
          handleRef.scrollEl.scrollTop = handleRef.scroll;
          handleRef.scrollEl.style.opacity = '1';
        });
      }
      handleRef.active=true;
    }
    this.shouldRetrieve=false;
    return handleRef.handle;
  }
  shouldReuseRoute(
    future:ActivatedRouteSnapshot,
    curr:ActivatedRouteSnapshot
  ){
    return future.routeConfig===curr.routeConfig;
  }
}