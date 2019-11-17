import { Injectable } from '@angular/core';

import { Business } from '../_interfaces/business.interface';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  getListByLocation = async (longitude: number, latitude: number, range?: number) => {
    // const list: Business[] = [
    //   {
    //     "_id": "5d856d47cabbad9c4cbb46f1",
    //     "business_id": "ISMk-CqQy4bYUqYB3nhoZA",
    //     "name": "Rodd Wolff's Hair Productions",
    //     "address": "2504 E Indian School Rd",
    //     "city": "Phoenix",
    //     "state": "AZ",
    //     "postal_code": "85016",
    //     "stars": 5,
    //     "review_count": 3,
    //     "is_open": 1,

    //     "categories": "Beauty & Spas, Hair Loss Centers, Wigs, Shopping, Hair Salons, Hair Extensions",
    //     "hours": {
    //         "Tuesday": "10:0-18:0",
    //         "Wednesday": "10:0-18:0",
    //         "Thursday": "10:0-18:0",
    //         "Friday": "10:0-18:0",
    //         "Saturday": "11:0-16:0"
    //     },
    //     "location": {
    //         "type": "Point",
    //         "coordinates": [
    //             -112.0278527,
    //             33.4951028
    //         ],
    //         "distance": 17.83087220111478
    //     }
    //   },
    //   {
    //       "_id": "5d856d3dcabbad9c4cba176e",
    //       "business_id": "j3NeXt2jzR_FX7Y-njRyEg",
    //       "name": "Trails",
    //       "address": "2501 E Indian School Rd",
    //       "city": "Phoenix",
    //       "state": "AZ",
    //       "postal_code": "85016",
    //       "stars": 1.125,
    //       "review_count": 4,
    //       "is_open": 0,
    //       "categories": "Tobacco Shops, Shopping",
    //       "hours": {
    //           "Monday": "10:0-22:0",
    //           "Tuesday": "10:0-22:0",
    //           "Wednesday": "10:0-22:0",
    //           "Thursday": "10:0-22:0",
    //           "Friday": "10:0-22:0",
    //           "Saturday": "10:0-22:0",
    //           "Sunday": "11:0-19:0"
    //       },
    //       "location": {
    //           "type": "Point",
    //           "coordinates": [
    //               -112.0279947,
    //               33.4946043
    //           ],
    //           "distance": 44.05161471764104
    //       }
    //   },
    //   {
    //       "_id": "5d844d3dcabbad9r5cbc076a",
    //       "business_id": "a3NeXt7jzR_FX7Z-bjRyEg",
    //       "name": "P'tsite Quebecoise",
    //       "address": "r357",
    //       "city": "Phoenix",
    //       "state": "AZ",
    //       "postal_code": "85016",
    //       "stars": 3.5,
    //       "review_count": 4,
    //       "is_open": 0,
    //       "categories": "Tobacco Shops, Shopping",
    //       "hours": {
    //           "Monday": "10:0-22:0",
    //           "Tuesday": "10:0-22:0",
    //           "Wednesday": "10:0-22:0",
    //           "Thursday": "10:0-22:0",
    //           "Friday": "10:0-22:0",
    //           "Saturday": "10:0-22:0",
    //           "Sunday": "11:0-19:0"
    //       },
    //       "location": {
    //           "type": "Point",
    //           "coordinates": [
    //               -112.0280947,
    //               33.4946143
    //           ],
    //           "distance": 144.123456
    //       }
    //   }
    // ];

    let url = `/api/business/location/${longitude},${latitude}?`;
    if (range) {
      url += `range=${range}`;
    }

    return new Promise<Business[]>( (resolve, reject) => {
      this.dataService.getData(url, this.polyfillCategory).subscribe(
        (blist) => { resolve(blist); },
        (error) => { reject(error);  }
      );
    });

  };

  polyfillCategory = (bList: Business[]) => {
    bList.map((business) => {
      if (!business.categories) {
        business.categories = "";
      }
    })
    return bList;
  };

  constructor(
    private dataService: DataService
  ) { }
}
