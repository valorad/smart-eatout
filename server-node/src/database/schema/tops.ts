import { model, Schema } from 'mongoose';

import { ITop } from "../interface/tops.interface";

const schema = new Schema({

  business_id: {
    type: String,
    required: true
  },

  dateStart: {
    type: Date,
    required: true
  },

  dateEnd: {
    type: Date,
    required: true
  },

  avgStars: {
    type: Number,
    required: true
  },

});

export const tops = model<ITop>('tops', schema, "tops");