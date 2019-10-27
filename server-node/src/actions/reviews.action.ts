import { IMQuery, Query } from "../utils/query";

// import schemas
import { reviews } from '../database/schema/reviews';

export class ReviewsAction {

  getAll = async () => {
    return await Query.getList(reviews);
  };

  getList = async(conditions: IMQuery["conditions"] = {}, otherParams?: IMQuery) => {

    try {
      let result = await Query.getList(
        reviews,
        {
          conditions,
          page: 1,
          perPage: 10,
          ...otherParams
        }
      );
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }

  };

  getSingleByBID = async (bid = "") => {
    return await Query.getDetail(reviews, {business_id: bid});
  };





}