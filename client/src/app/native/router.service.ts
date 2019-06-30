import {Router,NavigationStart} from "@angular/router";
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
import {NativeService} from "@services/native.service";
import {getPureUrl,getQueryParams} from "@tool/url";
import {Subject} from 'rxjs';

export interface routeMsg{
  url:string;
  trigger:any;
  pureUrl:string;
}
export interface popMsg{
  url:string;
  pureUrl:string;
}

const routeChangeSubject:Subject<routeMsg>=new Subject<routeMsg>();
const routePopSubject:Subject<popMsg>=new Subject<popMsg>();

export class ChildRoute{
  pureUrl:string;
  popOrder:any;
  attach:number=0;
  win:Window;
  backSubject:Subject<void>=new Subject<void>();
  constructor(){
    this.win=window;
    this.pureUrl=getPureUrl(location.href);
    this.popOrder=routePopSubject.subscribe((msg:popMsg)=>{
      if(this.pureUrl.indexOf(msg.pureUrl)>=0){
        if(this.attach>0){
          this.attach--;
        }else{
          this.win.nativeRouter.native.pageBack();
          this.backSubject.next();
        }
      }
    })
  }
  addDump=()=>this.attach+=1;
  clearDump=()=>this.attach=0;
  //navigator method
  //本页跳转
  dump=(params:Object)=>{
    this.win.nativeRouter.router.navigateByUrl(this.pureUrl,{queryParams:params})
    this.addDump();
  };
  //跳转不推入路由
  replace=(url:any,args:Object={})=>this.win.nativeRouter.router.navigate(url,{replaceUrl:true,...args});
  //跳转推入路由，并触发动画
  nav=(url:any,...args)=>{
    this.win.nativeRouter.router.navigate(url,...args);
    this.win.nativeRouter.native.pageForward();
  };
  //返回，自动触发动画
  back=()=>this.win.nativeRouter._location.back();
}

@Injectable({
  providedIn:"root"
})
export class NativeRouterService{
  activeUrl:string;
  activePureUrl:string;
  constructor(
    public router:Router,
    public _location:Location,
    public native:NativeService
  ) {
    window.nativeRouter=this;
    this.router.events.subscribe(e=>{
      if( e instanceof NavigationStart){
        this.activeUrl=e.url;
        this.activePureUrl=getPureUrl(e.url);
        routeChangeSubject.next({
          url:e.url,
          trigger:e.navigationTrigger,
          pureUrl:this.activePureUrl
        })
      }
    });
    window.addEventListener("popstate",()=>{
      const url=this.activePureUrl;
      routePopSubject.next({
        url,
        pureUrl:getPureUrl(url)
      })
    })
  }
}
