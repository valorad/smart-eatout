import { Component, Input } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  private _bList = [];

  bListThrottled = [];

  businessTops: Business[] = [];

  modes = [
    {
      name: "allTime",
      nameDisplay: "All Time"
    },
    {
      name: "recent",
      nameDisplay: "Recent Weeks"
    }
  ]

  currentMode = "allTime";

  @Input()
  set bList(nextList: Business[]) {
    this._bList = nextList;
    this.bListThrottled = this.throttleBusiness(20);
    this.getAllTimeTops(10);
  }
  get bList() {
    return this._bList;
  }

  selectMode = (nextMode: string) => {
    this.currentMode = nextMode;
  };

  throttleBusiness = (num: number) => {
    return this.bList.slice(0, num);
  };

  getAllTimeTops = (top: number) => {
    this.bListThrottled.sort( (businessA, businessB) => {
      return businessB.stars - businessA.stars
    } );
    this.businessTops = this.bListThrottled.slice(0, top);
  };

  constructor() { }

}
