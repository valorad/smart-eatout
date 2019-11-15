import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

interface BusinessTops {
  allTime: Business[],
  recent: Business[],
}

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  private _bList = [];

  bListThrottled = [];

  businessTops: BusinessTops = {
    allTime: [],
    recent: [],
  }

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
    this._bList = this.cloneJSONArray(nextList);
    this.bListThrottled = this.throttleBusiness(20);
    this.selectMode("allTime");
  }
  get bList() {
    return this._bList;
  }

  @Output() nextTop = new EventEmitter<Business[]>();

  selectMode = (nextMode: string) => {
    this.currentMode = nextMode;
    switch (nextMode) {
      case "allTime":
        this.getAllTimeTops(10);
        this.nextTop.emit(this.businessTops[nextMode])
        break;
      case "recent":
        console.log("Get Recent");
        break;
      default:
        console.log(`invalid mode ${nextMode}`);
        break;
    }
  };

  throttleBusiness = (num: number) => {
    return this.bList.slice(0, num);
  };

  getAllTimeTops = (top: number) => {
    this.bListThrottled.sort( (businessA, businessB) => {
      return businessB.stars - businessA.stars
    } );
    this.businessTops.allTime = this.bListThrottled.slice(0, top);
  };

  cloneJSONArray = (arr: any[]) => {
    let newArr: any[] = [];
    for (let obj of arr) {
      let newObj = Object.assign({}, obj);
      newArr.push(newObj);
    }
    return newArr;
  };

  constructor() { }

}
