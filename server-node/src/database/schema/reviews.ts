import { model, Schema } from 'mongoose';

import { IReview } from "../interface/reviews.interface";
import { Int32 } from 'mongodb';

const schema = new Schema({
  review_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  business_id: {
    type: String,
    required: true
  },
  stars: {
    type: Int32,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  useful: {
    type: Number,
    required: true
  },
  funny: {
    type: Number,
    required: true
  },
  cool: {
    type: Number,
    required: true
  },
});

export const reviews = model<IReview>('reviews', schema, "reviews");