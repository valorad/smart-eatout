import { Document } from 'mongoose';

interface IParking {
  garage?: boolean,
  street?: boolean,
  validated?: boolean,
  lot?: boolean,
  valet?: boolean,
}

interface IBusinessAttribute {
  RestaurantsTakeOut?: boolean,
  BusinessParking: IParking,
}

interface IHours {
  Monday?: string,
  Tuesday?: string,
  Wednesday?: string,
  Thursday?: string,
  Friday?: string,
  Saturday?: string,
  Sunday?: string,
}



interface IGeoLocation {
  type: string
  coordinates: number[]
}


export interface IBusiness extends Document {
  business_id: string,
  name: string,
  address: string,
  city?: string,
  state?: string,
  postal_code: string,
  location: IGeoLocation,
  stars: number,
  review_count?: number,
  is_open: 0 | 1, // integer, 0 or 1 for closed or open, respectively
  attributes: IBusinessAttribute,
  categories: string[],
  hours: IHours
}