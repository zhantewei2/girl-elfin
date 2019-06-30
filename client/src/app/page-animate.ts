import {
  trigger,
  transition,
  style,
  state,
  animate,
  query,
  stagger,
  group,
  keyframes
} from '@angular/animations';

const time='.3s ease-out';

export const backBtn=trigger('BackBtn',[
  transition(':leave',animate(time,style({opacity:0,transform:"translateX(-30%) scale(.6,.6)"}))),
  transition(':enter',[style({opacity:0,transform:"translateX(-30%) scale(.6,.6)"}),animate(time)])
]);


export const mainSearch=trigger("MainSearch",[
  transition(":enter",[style({opacity:0,transform:"scale3d(1.5,1.5,1.5)"}),animate(time)]),
  transition(":leave",animate(".2s ease-out",style({opacity:0,transform:"scale3d(1.5,1.5,1.5)"})))
]);