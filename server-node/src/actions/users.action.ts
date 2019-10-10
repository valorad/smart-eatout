import { IMQuery, Query } from "../utils/query";

// import schemas
import { users } from '../database/schema/users';

export class UsersAction {

  getAll = async () => {
    return await Query.getList(users);
  };

  getList = async(conditions: IMQuery["conditions"] = {}, otherParams?: IMQuery) => {

    try {
      let result = await Query.getList(
        users,
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