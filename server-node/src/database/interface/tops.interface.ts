import { Document } from 'mongoose';

export interface ITop extends Document {
  business_id: string,
  dateStart: Date,
  dateEnd: Date,
  avgStars: number,
}