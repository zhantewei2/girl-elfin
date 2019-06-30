import {Page_Back,Page_Forward} from "./config";

declare var cordova:any;
declare var StatusBar:any;
declare var plugins:any;
declare var ImagePicker:any;


export class Native {
  constructor() {

  }

  slide=(
    params:any,
    cb:any=()=>{},
    err:any=()=>{}
  )=>{
    try {
      plugins.nativepagetransitions.slide(params, cb, err);
    }catch(e){}
  };
  pageForward=(cb?:Function)=>this.slide(Page_Forward,cb);
  pageBack=(cb?:Function)=>this.slide(Page_Back,cb);

}


export const native=new Native();







