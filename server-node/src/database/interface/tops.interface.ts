import { Document } from 'mongoose';


export interface ITop extends Document {
  dateStart: Date,
  dateEnd: Date,
  business_id: string,
  avgStars: number,
}