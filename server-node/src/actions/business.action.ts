import { IMQuery, Query } from "../utils/query";

// import schemas
import { business } from '../database/schema/business';

export class BusinessAction {

  getAll = async () => {
    return await Query.getList(business);
  };

  getList = async(conditions: IMQuery["conditions"] = {}, otherParams?: IMQuery) => {

    try {
      let result = await Query.getList(
        business,
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


}