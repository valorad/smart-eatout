// import schemas
import { tops } from '../database/schema/tops';
import { reviews } from "../database/schema/reviews";
import { ModelMapReduceOption } from 'mongoose';
import { IBusiness } from '../database/interface/business.interface';

export class TopsAction {

  getDetail = (dateStart?: Date, dateEnd?: Date) => {
    // query within a specific period
    return {}
  };

  // add = async (dateStart?: Date, dateEnd?: Date) => {
  //   // run mapreduce, calculate average star, and store into tops collection
  //   let mrOptions: ModelMapReduceOption<any, any, any> = {
  //     map: `function () { emit(this.business_id, this.stars) }`,
  //     reduce: function () {

  //     },
      
      
  //     // (key, values) => {
  //     //   // sum up
  //     //   let sum = values.reduce((prev, current) => {
  //     //     return current += prev;
  //     //   });
  //     //   // get average
  //     //   return sum / values.length;
  //     // },
  //     out: {
  //       replace: "_topOut"
  //     }
  //   };
  //   let result = await business.mapReduce(mrOptions);
  //   return result.find({}, {}, {limit: 10});
  // };

  add = async (dateStart?: Date, dateEnd?: Date) => {
    let result = await reviews.aggregate([
      { $match: {} },
      { $limit: 100 },
      { $skip: 0},
      { $group: {_id: "$business_id", mongoID: {$first: "$_id"}, avgStar: {$avg: "$stars"} } },
      // _id: means group by business_id
    ]).allowDiskUse(true);
    return result;
  }

}