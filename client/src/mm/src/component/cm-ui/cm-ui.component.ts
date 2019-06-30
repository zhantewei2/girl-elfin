import {Component,ViewContainerRef} from "@angular/core";
import {UIService} from "../../service/ui.service";

@Component({
  selector:"cm-ui",
  template:``
})
export class CmUiComponent{
  constructor(
    private ui:UIService,
    public view:ViewContainerRef
  ){
    ui.bind(view);
  }

}