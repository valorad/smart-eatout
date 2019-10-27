// import schemas
import { tops } from '../database/schema/tops';
import { reviews } from "../database/schema/reviews";
import { ModelMapReduceOption } from 'mongoose';
import { IBusiness } from '../database/interface/business.interface';
import { ITop } from '../database/interface/tops.interface';
import { Query } from '../utils/query';

interface IGroupResult {
  _id: string, // is actually the business_id
  mongoID: string,
  avgStars: number,
}

export class TopsAction {

  /**@deprecated */
  getDetail = (dateStart?: Date, dateEnd?: Date) => {
    // query within a specific period
    return {}
  };

  /**@deprecated */
  add = async (dateStart?: Date, dateEnd?: Date) => {
    // round to a day
    // if (dateStart) {
    //   dateStart = this.roundDate(dateStart)
    // } else {
    //   dateStart = new Date("2000-01-01");
    // }

    // if (dateEnd) {
    //   dateEnd = this.roundDate(dateEnd)
    // } else {
    //   dateEnd = this.roundDate(new Date());
    // }
    
    let results: IGroupResult[] = await reviews.aggregate([
      { $match: {} },
      // { $limit: 3 },
      // { $skip: 0 },
      { $group: {_id: "$business_id", mongoID: {$first: "$_id"}, avgStars: {$avg: "$stars"} } },
      // { $sort: { avgStars: -1 } },
      // _id: means group by business_id
    ]).allowDiskUse(true);

    let okCount = 0;
    // format data
    // for (let result of results) {

    //   let top = {} as ITop;
    //   top.dateStart = dateStart;
    //   top.dateEnd = dateEnd;
    //   top.business_id = result._id;
    //   top.avgStars = result.avgStars;


    //   // add to tops collection
    //   Query.addRecord(
    //     tops,
    //     top,
    //     undefined,
    //     () => {
    //       okCount++;
    //     }
    //   );
    // }

    return {message: results.length}


  }

  getTop = async (businessIDs: string[]) => {

    const results: IGroupResult[] = await reviews.aggregate([
      { $match: { business_id: { $in: businessIDs } } },
      // { $limit: 3 },
      // { $skip: 0 },
      { $group: {_id: "$business_id", mongoID: {$first: "$_id"}, avgStars: {$avg: "$stars"} } },
      // { $sort: { avgStars: -1 } },
      // _id: means group by business_id
    ]).allowDiskUse(true);

    return results;

  };

  roundDate = (date: Date) => {
    return new Date(`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`);
  }

}