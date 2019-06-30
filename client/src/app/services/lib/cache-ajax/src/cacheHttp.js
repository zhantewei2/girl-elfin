import {CappedMap} from './cappedMap';
import {httpBase,queryStringify} from './zhttp';

import {Observable} from 'rxjs';
export function toKey(url,params){
  return url+'?'+JSON.stringify(params);
}


export class CacheHttp{
  constructor({_expires,limit,skip}={},filter){
    const
    http=new httpBase(),
    store=new CappedMap(limit,skip),
    pendingQueue=[],
    saveData=(key,data,expires)=>{
      store.set(key,{
        data:data,
        expiresDate:new Date().getTime()+expires*60000
      })
    },
    getData=(key)=>{
      const result=store.get(key);
      if(!result)return null;
      return result.expiresDate<new Date().getTime()?null:result.data;
    },
    removePending=key=>{
      const index=pendingQueue.findIndex(item=>item.key===key);
      if(index!==-1)pendingQueue.splice(index,1);
    };

    this.xhr=(method,url,params,{expires,headers,key}={})=>{
        return Observable.create(ob=>{
          expires=expires||_expires;
          key=key||toKey(url,params);
          let storeResult=getData(key);
          if(storeResult)return ob.next(storeResult);

          let pending=pendingQueue.find(pendingItem=>pendingItem.key===key);
          if(pending)return pending.run=result=>ob.next(result);
          const pendingItem={
            key:key,
            run:null
          };
          pendingQueue.push(pendingItem);

          //send xhr:
          const endErr=err=>{
            removePending(key);
            ob.error(err);
          }
          
          const sendOrder=http.send(method,url,params,headers).subscribe(result=>{
            const end=(filterResult)=>{
              if(expires)saveData(key,filterResult,expires);
              removePending(key);
              pendingItem.run?pendingItem.run(filterResult):ob.next(filterResult);
            }
            if(filter){

              filter(
                result,
                ({_params,_headers})=>http.send(method,url,_params||params,_headers||headers)
              )
              .then(end)
              .catch(endErr)
            }else{
              end(result);
            }

          },
            endErr
          );

          //redefine unsubscribe:
          const oldUnsubscribe=ob.unsubscribe;
          ob.unsubscribe=()=>{
            removePending(key);
            sendOrder.unsubscribe();
            oldUnsubscribe.call(ob);
          };

        })
    }
  }
}
