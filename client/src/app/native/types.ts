declare global{
  interface Object{
    prototype:any;
    __proto__:any;
    nav:any;
    replace:any;
    dump:any;
    back:any;
    addDump:any;
    clearDump:any;
    cmCacheKey:any;
    clearCacheRoute:any;
    cmScrollElement:any;
  }
  interface Window{
    nativeRouter:any;
    socket:any;
  }

}
export class empty{
}