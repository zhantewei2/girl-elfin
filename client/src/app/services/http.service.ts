import { Injectable } from '@angular/core';
import {host} from '@env';
import {CacheHttp} from './lib/cache-ajax';

const reURL=(url:string)=>url[0]=="/"?url:"/"+url;


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public http:any;
  tryJson=(content:string,success:Function,fail:Function)=>{
    let result:any;
    try{
      result=JSON.parse(content);
      success(result);
    }catch(e) {
      fail(content);
    }
  };

  constructor() {
    this.http=new CacheHttp(undefined,(res:any,request:any)=>{
      return new Promise((resolve,reject)=>{
        let content:any;
        if(res.status!==200){
          this.tryJson(res.content,reject,reject);
        }else{
          this.tryJson(res.content,resolve,reject);
        }
      })
    });
  }

  xhr:any=(method:string,url:string,...args:any)=>
    this.http.xhr(method,host+reURL(url),...args);
}
