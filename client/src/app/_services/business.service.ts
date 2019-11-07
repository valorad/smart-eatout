import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  getListByLocation = async (longitude: number, latitude: number, range?: number) => {
    const list = [
      {
        "_id": "5d856d47cabbad9c4cbb46f1",
        "business_id": "ISMk-CqQy4bYUqYB3nhoZA",
        "name": "Rodd Wolff's Hair Productions",
        "address": "2504 E Indian School Rd",
        "city": "Phoenix",
        "state": "AZ",
        "postal_code": "85016",
        "stars": 5,
        "review_count": 3,
        "is_open": 1,
        "attributes": {
            "RestaurantsPriceRange2": "2",
            "BikeParking": "True",
            "BusinessAcceptsCreditCards": "False",
            "BusinessParking": "{'garage': False, 'street': True, 'validated': False, 'lot': True, 'valet': False}",
            "HairSpecializesIn": "{'straightperms': True, 'coloring': True, 'extensions': True, 'africanamerican': True, 'curly': True, 'kids': True, 'perms': True, 'asian': True}",
            "WheelchairAccessible": "True"
        },
        "categories": "Beauty & Spas, Hair Loss Centers, Wigs, Shopping, Hair Salons, Hair Extensions",
        "hours": {
            "Tuesday": "10:0-18:0",
            "Wednesday": "10:0-18:0",
            "Thursday": "10:0-18:0",
            "Friday": "10:0-18:0",
            "Saturday": "11:0-16:0"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                -112.0278527,
                33.4951028
            ],
            "distance": 17.83087220111478
        }
      },
      {
          "_id": "5d856d3dcabbad9c4cba176e",
          "business_id": "j3NeXt2jzR_FX7Y-njRyEg",
          "name": "Trails",
          "address": "2501 E Indian School Rd",
          "city": "Phoenix",
          "state": "AZ",
          "postal_code": "85016",
          "stars": 3.5,
          "review_count": 4,
          "is_open": 0,
          "attributes": {
              "BusinessParking": "{'garage': False, 'street': False, 'validated': False, 'lot': True, 'valet': False}",
              "BikeParking": "True",
              "BusinessAcceptsCreditCards": "True",
              "RestaurantsPriceRange2": "3"
          },
          "categories": "Tobacco Shops, Shopping",
          "hours": {
              "Monday": "10:0-22:0",
              "Tuesday": "10:0-22:0",
              "Wednesday": "10:0-22:0",
              "Thursday": "10:0-22:0",
              "Friday": "10:0-22:0",
              "Saturday": "10:0-22:0",
              "Sunday": "11:0-19:0"
          },
          "location": {
              "type": "Point",
              "coordinates": [
                  -112.0279947,
                  33.4946043
              ],
              "distance": 44.05161471764104
          }
      },
      {
          "_id": "5d844d3dcabbad9r5cbc076a",
          "business_id": "a3NeXt7jzR_FX7Z-bjRyEg",
          "name": "P'tsite Quebecoise",
          "address": "r357",
          "city": "Phoenix",
          "state": "AZ",
          "postal_code": "85016",
          "stars": 3.5,
          "review_count": 4,
          "is_open": 0,
          "attributes": {
              "BusinessParking": "{'garage': False, 'street': False, 'validated': False, 'lot': True, 'valet': False}",
              "BikeParking": "True",
              "BusinessAcceptsCreditCards": "True",
              "RestaurantsPriceRange2": "3"
          },
          "categories": "Tobacco Shops, Shopping",
          "hours": {
              "Monday": "10:0-22:0",
              "Tuesday": "10:0-22:0",
              "Wednesday": "10:0-22:0",
              "Thursday": "10:0-22:0",
              "Friday": "10:0-22:0",
              "Saturday": "10:0-22:0",
              "Sunday": "11:0-19:0"
          },
          "location": {
              "type": "Point",
              "coordinates": [
                  -112.0280947,
                  33.4946143
              ],
              "distance": 144.123456
          }
      }
    ];

    return list;
  };

  constructor() { }
}
