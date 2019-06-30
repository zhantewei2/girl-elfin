import {Injectable, Component,ComponentFactoryResolver, ViewContainerRef, ComponentRef} from '@angular/core';
import {MessageComponent} from "../component/message/message.component";
import {ToastComponent,State} from "../component/toast/toast.component";

export interface StoreComponent{
  message?:any;
  toast?:any;
}


@Injectable({
  providedIn:"root"
})
export class UIService{
  constructor(
    private _cfr:ComponentFactoryResolver,
  ){}
  private checkDom(componentName:string,component:any){
    let instance:any=this.storeComponent[componentName];
    if(!instance){
      const componentRef:ComponentRef<any>=this.container.createComponent(this._cfr.resolveComponentFactory(component));
      const rootNode:HTMLElement=(componentRef.hostView as any).rootNodes[0];
      document.body.appendChild(rootNode);
      instance=this.storeComponent[componentName]=componentRef.instance;
    }
    return instance;
  }
  bind=(view:ViewContainerRef)=>this.container=view;
  container:ViewContainerRef;
  storeComponent:StoreComponent={};

  public message=(content:string)=>
    this.checkDom("message",MessageComponent)
      .show("default",content);

  public toast=(config:State)=>
    this.checkDom("toast",ToastComponent)
      .open(config);


}