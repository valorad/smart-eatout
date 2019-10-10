import { Document } from 'mongoose';

export interface IReview extends Document {
  review_id: string,
  user_id: string,
  business_id: string,
  stars: number,
  date: Date,
  text?: string,
  useful: number,
  funny: number,
  cool: number,
}