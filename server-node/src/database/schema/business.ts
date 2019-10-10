import { model, Schema } from 'mongoose';

import { IBusiness } from "../interface/business.interface";

const schema = new Schema({

  business_id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: false
  },

  state: {
    type: String,
    required: false
  },

  postal_code: {
    type: String,
    required: true
  },

  latitude: {
    type: Number,
    required: true
  },

  longitude: {
    type: Number,
    required: true
  },

  stars: {
    type: Number,
    required: true
  },

  review_count: {
    type: Number,
    required: false
  },

  is_open: {
    type: Number,
    required: true
  },

  attributes: {
    type: {
      RestaurantsTakeOut: {
        type: Boolean,
        required: true
      },
      BusinessParking: {
        type: {
          garage: {
            type: Boolean,
            required: false
          },
          street: {
            type: Boolean,
            required: false
          },
          validated: {
            type: Boolean,
            required: false
          },
          lot: {
            type: Boolean,
            required: false
          },
          valet: {
            type: Boolean,
            required: false
          },
        },
        required: true
      },
    },
    required: true
  },

  categories: {
    type: [String],
    required: true
  },

  hours: {
    type: {
      Monday: {
        type: String,
        required: false
      },
      Tuesday: {
        type: String,
        required: false
      },
      Wednesday: {
        type: String,
        required: false
      },
      Thursday: {
        type: String,
        required: false
      },
      Friday: {
        type: String,
        required: false
      },
      Saturday: {
        type: String,
        required: false
      },
      Sunday: {
        type: String,
        required: false
      },
    },
    required: true
  }

});


export const business = model<IBusiness>('business', schema, "business");