// import schemas
import { reviews } from "../database/schema/reviews";
import { DateForm } from "../utils/dateForm";

interface IGroupResult {
  _id: string, // is actually the business_id
  mongoID: string,
  avgStars: number,
}

export class TopsAction {

  dateF = new DateForm();

  /**@deprecated */
  getDetail = (dateStart?: Date, dateEnd?: Date) => {
    // query within a specific period
    return {}
  };

  /**@deprecated */
  add = async (dateStart?: Date, dateEnd?: Date) => {
    // round to a day
    // if (dateStart) {
    //   dateStart = this.dateF.round(dateStart)
    // } else {
    //   dateStart = new Date("2000-01-01");
    // }

    // if (dateEnd) {
    //   dateEnd = this.dateF.round(dateEnd)
    // } else {
    //   dateEnd = this.dateF.round(new Date());
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

  getTop = async (businessIDs: string[], startDate?: Date, endDate?: Date) => {

    let filters = {
      business_id: { $in: businessIDs },
      date: {
        $gte: (startDate? this.dateF.round(startDate): new Date("2000-01-01")),
        $lte: (endDate? this.dateF.round(endDate): new Date())
        // $lte: new Date().getTime()
      }
    }

    const results: IGroupResult[] = await reviews.aggregate([
      
      // { $limit: 1000000 },
      { $match: filters },
      
      // { $skip: 0 },
      { $group: {_id: "$business_id", mongoID: {$first: "$_id"}, avgStars: {$avg: "$stars"} } },
      // { $sort: { avgStars: -1 } },
      // _id: means group by business_id
    ]).allowDiskUse(true);

    return results;

  };



}