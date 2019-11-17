import { Injectable } from '@angular/core';

import { Top } from '../_interfaces/top.interface';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TopService {

  getTop = async (businessIDs: string[], startDate?: Date, endDate?: Date) => {
    // let tops: Top[] = [
    //   {
    //     "_id": "ISMk-CqQy4bYUqYB3nhoZA",
    //     "mongoID": "5d868ccf4e2cfb028e2d2281",
    //     "avgStars": 1
    //   },
    //   {
    //     "_id": "j3NeXt2jzR_FX7Y-njRyEg",
    //     "mongoID": "5d868cd04e2cfb028e2d5e01",
    //     "avgStars": 1.2
    //   },
    //   {
    //     "_id": "a3NeXt7jzR_FX7Z-bjRyEg",
    //     "mongoID": "5d868cd24e2cfb028e2e0c26",
    //     "avgStars": 2.5
    //   }
    // ]
    // return tops;

    let url = `/api/tops/${businessIDs}?`;
    if (startDate) {
      url += `startDate=${startDate.getTime()}&`;
    }

    if (endDate) {
      url += `endDate=${endDate.getTime()}&`;
    }

    return new Promise<Top[]>( (resolve, reject) => {
      this.dataService.getData(url).subscribe(
        (tops) => { resolve(tops); },
        (error) => { reject(error); }
      );
    });

  };

  constructor(
    private dataService: DataService
  ) { }
}
