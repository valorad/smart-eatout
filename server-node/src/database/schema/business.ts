import { model, Schema } from 'mongoose';

import { IBusiness } from "../interface/business.interface";

const schema = new Schema({

  name: {
    type: String,
    required: true
  },

  stars: {
    type: Number,
    required: true
  },

  is_open: {
    type: Number,
    required: true
  },

});


export const business = model<IBusiness>('business', schema, "business");