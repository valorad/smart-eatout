import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TopService } from '../_services/top.service';

import { Business } from '../_interfaces/business.interface';


interface BusinessTopResults {
  allTime: Business[],
  recent: Business[],
}

interface TopBusiness extends Business {
  avgStars: number,
}

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  private _bList = [];

  bListThrottled: Business[] = [];

  businessTops: BusinessTopResults = {
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
      nameDisplay: "Recent 4 Weeks"
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

  selectMode = async (nextMode: string) => {
    this.currentMode = nextMode;

    switch (nextMode) {
      case "allTime":
        this.getAllTimeTops(10);
        break;
      case "recent":
        await this.getRecentTops(10);
        break;
      default:
        console.log(`invalid mode ${nextMode}`);
        break;
    }
    
    this.nextTop.emit(this.businessTops[nextMode] || [])
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

  extractBIDs = () => {
    let bids: string[] = [];
    for (let business of this.bListThrottled) {
      bids.push(business.business_id);
    }
    return bids;
  };

  getRecentTops = async (top: number) => {
    let startDate = new Date("2018-11-01");
    let endDate = new Date("2018-12-01");

    let topResults = await this.topService.getTop(this.extractBIDs(), startDate, endDate);

    // insert the avg star info to the complete corresponding business data
    let topBusiness: TopBusiness[] = [];
    for (let top of topResults) {
      let business = this.bListThrottled.find((business) => {
        return business.business_id === top._id;
      }) as TopBusiness;

      business.avgStars = top.avgStars;

      topBusiness.push(business);
    }

    topBusiness.sort( (businessA, businessB) => {
      return businessB.avgStars - businessA.avgStars
    });
    
    this.businessTops.recent = topBusiness.slice(0, top);

  };

  cloneJSONArray = (arr: any[]) => {
    let newArr: any[] = [];
    for (let obj of arr) {
      let newObj = Object.assign({}, obj);
      newArr.push(newObj);
    }
    return newArr;
  };

  constructor(
    private topService: TopService
  ) { }

}
