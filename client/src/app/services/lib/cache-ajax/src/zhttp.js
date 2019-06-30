import {Observable} from 'rxjs';
import {ContentType} from './contentType';
export const queryStringify=obj=>{
  if(!obj)return '';
  let str='';
  for(let i in obj){
    str+=i+'='+obj[i]+'&'
  }
  return str.slice(0,-1);
}


export class httpBase{
  constructor(){


    this.send=(method,address,params,headers={})=> {
      method=method.toUpperCase();
      if(params&&method==='GET')address=address+'?'+queryStringify(params)
        const xhr=new XMLHttpRequest();

        let sendQuery='';

        return Observable.create((ob) => {
          xhr.onreadystatechange = () => {
            if(xhr.readyState===4){
              if(xhr.status===0){
                console.error('Connect failure,status:'+xhr.status)
                return ob.error('err')
              }
              ob.next({status:xhr.status,content:xhr.responseText})
            }
          };
          if(method!=='GET'){
            const r=ContentType(params);
            sendQuery=r.params;
            headers=r.type?Object.assign({'Content-Type':r.type},headers):headers;
          }
          //unsubscribe abort xhr:
          const old=ob.unsubscribe;
          ob.unsubscribe=()=>{
            xhr.abort();
            old.call(ob);
          };

          //send msg:
          xhr.open(method, address);
          xhr.withCredentials=true;
          for(let i in headers){
            xhr.setRequestHeader(i,headers[i]);
          }

          xhr.send(sendQuery);
        })

    }
  }
}
