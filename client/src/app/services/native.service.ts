import { Injectable } from '@angular/core';
import {Native} from "../native/native";

@Injectable({
  providedIn: 'root'
})
export class NativeService extends Native{

  constructor() {
    super();
  }

}
