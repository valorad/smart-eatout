import { model, Schema } from 'mongoose';

import { IUser } from "../interface/users.interface";

const schema = new Schema({

  user_id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  review_count: {
    type: Number,
    required: true
  },

  yelping_since: {
    type: Date,
    required: true
  },

  friends: {
    type: [String],
    required: true
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

  fans: {
    type: Number,
    required: true
  },

  elite: {
    type: [Number],
    required: true
  },

  average_stars: {
    type: Number,
    required: true
  },

  compliment_hot: {
    type: Number,
    required: false
  },

  compliment_more: {
    type: Number,
    required: false
  },

  compliment_profile: {
    type: Number,
    required: false
  },

  compliment_cute: {
    type: Number,
    required: false
  },

  compliment_list: {
    type: Number,
    required: false
  },

  compliment_note: {
    type: Number,
    required: false
  },

  compliment_plain: {
    type: Number,
    required: false
  },

  compliment_cool: {
    type: Number,
    required: false
  },

  compliment_funny: {
    type: Number,
    required: false
  },

  compliment_writer: {
    type: Number,
    required: false
  },

  compliment_photos: {
    type: Number,
    required: false
  }

});

export const users = model<IUser>('users', schema, "users");