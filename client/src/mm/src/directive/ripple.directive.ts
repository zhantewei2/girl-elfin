import { Directive,ElementRef,Output,EventEmitter,Input} from '@angular/core';
import {ToolService} from '../service/tool.service';


@Directive({
  selector: '[cm-ripple]'
})
export class RippleDirective {
    @Input()useClick:any;
  @Input('cm-ripple')set rect(val:any){
    if(val=='circle')this.opts.circle=true;
  }
  @Input()set size(val:'sm'|'md'|'lg'){
    if(!val)return;
    this.opts.fontSize=(val=='lg')?40:(val=='md'?25:10);
  };
  @Input()set noneBg(val:any){
    this.opts.noneBg=val;
  };
  @Input()set noneAppend(val:any){
    this.opts.noneAppend=val;
  };
  @Output()cmTap:EventEmitter<any>=new EventEmitter<any>();
  opts:any={
    fontSize:40
  };
  constructor(
    private _el:ElementRef,
    private tool:ToolService
  ){
    const node:any=_el.nativeElement;
    tool.ripple(node,this.opts);
    node.classList.add('no-select');
    node.cmAddEventListener('contextmenu',e=>e.preventDefault());

  }
  ngOnInit(){
      if(this.useClick||this.useClick===''){
          this._el.nativeElement.addEventListener('click',(e)=>{
              setTimeout(()=>{
                  this.cmTap.emit();
              },110)
          })
      }
  }
}
