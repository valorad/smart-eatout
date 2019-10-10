import { model, Schema } from 'mongoose';

import { IReview } from "../interface/reviews.interface";

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
    type: Number,
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