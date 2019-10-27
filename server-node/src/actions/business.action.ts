import { IMQuery, Query } from "../utils/query";

// import schemas
import { business } from '../database/schema/business';
import { IBusiness } from "../database/interface/business.interface";

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

  /**
   * getListByLocation
   * @param range: in meters
   */
  getListByLocation = async (currentLocation: IBusiness["location"], range = 1000, options = {}) => {

    let result = await business.aggregate([
      {
        $geoNear: {
          near: currentLocation,
          distanceField: "location.distance", // calc in meters
          ...options
        }
      },
      {
        $match: {
          "location.distance": {
            $lte: range
          }
        }
      },
      {
        $limit: 100
      },
      {
        $sort: { "location.distance": 1 }
      }

    ]);

    return result;

  };

  


}