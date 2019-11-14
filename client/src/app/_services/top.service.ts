import { Injectable } from '@angular/core';
import { Top } from '../_interfaces/top.interface';

@Injectable({
  providedIn: 'root'
})
export class TopService {

  getTop = async (businessIDs: string[], startDate?: Date, endDate?: Date) => {
    let tops: Top[] = [
      {
        "_id": "ISMk-CqQy4bYUqYB3nhoZA",
        "mongoID": "5d868ccf4e2cfb028e2d2281",
        "avgStars": 3
      },
      {
        "_id": "j3NeXt2jzR_FX7Y-njRyEg",
        "mongoID": "5d868cd04e2cfb028e2d5e01",
        "avgStars": 2.6666666666666665
      },
      {
        "_id": "a3NeXt7jzR_FX7Z-bjRyEg",
        "mongoID": "5d868cd24e2cfb028e2e0c26",
        "avgStars": 2.7666666666666666
      }
    ]
    return tops;
  };

  constructor() { }
}
