import { Component, OnInit ,ViewChild,ViewRef} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  host:{
    class:"cm-abs-body flex-column all-hide"
  }
})
export class ChatComponent implements OnInit {
  @ViewChild("input",{static:true})input:any;
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.input.nativeElement.focus();
    },300);
  }

}
