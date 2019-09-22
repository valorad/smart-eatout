import { Model, Document } from "mongoose";
import { DeleteWriteOpResultObject, ObjectId } from 'mongodb';

export interface IMQuery {
  conditions?: any,
  includes?: string[],
  excludes?: string[],
  page?: number,
  perPage?: number,
  orderBy?: string,
  order?: "asc" | "desc"
}

interface IUpdateOptions {
  updateAll?: boolean
}

export class Query {

  static getList = async <T extends Document>(collection: Model<T>, query: IMQuery = {}) => {

    let conditions = query.conditions || {};

    let projections: any = {};

    // set fields to show
    for (let field of query.includes || []) {
      projections[field] = 1;
    }

    // set fields to hide
    for (let field of query.excludes || []) {
      projections[field] = 0;
    }

    let options: any = {};

    // set paginations
    if (query.page) {
      let limit = query.perPage || 10;
      let offset = (query.page - 1) * limit;
      options["skip"] = offset;
      options["limit"] = limit;
    }

    // set orderBy
    let sort: any = {};

    if (query.orderBy) {
      if (query.order === "desc") {
        sort[query.orderBy] = -1;
      } else {
        // default displayed ascended
        sort[query.orderBy] = 1;
      }
      
    }

    let result = await collection.find(conditions, projections, options).sort(sort);
    return result;

  };

  static getDetail = async <T extends Document>(collection: Model<T>, conditions: any = {}) => {
    try {
      let result = await collection.find(conditions);

      if (result.length >= 1) {
        return result[0];
      } else {
        return {} as T;
      }
      
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
    
    
  };

  static addRecord = async <T extends Document>(collection: Model<T>, source: any, fields?: string[], postActions?: (raw: any)=>any) => {
    let recordToSave: any = {};

    if (fields) {
      for (let field of fields) {
        if (source[field]) {
          recordToSave[field] = source[field];
        }
      }
    } else {
      recordToSave = source;
    }

    if (postActions) {
      postActions(recordToSave);
    }

    let newRecord = new collection(recordToSave);

    try {
      return await newRecord.save();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }

  };

  /**
   * update record by condition and update object.
   * For para. 'update':
   * could be doc directly.
   * if top-level key is not atomic(i.e $set, $inc, $push etc.),
   * it will be considered as "$set"
   */
  static setRecord = async <T extends Document>(collection: Model<T>, conditions: any, update: any, options: IUpdateOptions = {}) => {
    try {

      let updatedRecords: T[];
      if (options.updateAll) {

        if (
          conditions === undefined ||
          conditions === null ||
          ( Object.entries(conditions).length === 0 && conditions.constructor === Object ) // <- conditions is a {}
        ) {
          throw new Error("Unconditional updateMany is not allowed. Condition provided: " + conditions);
        }

        let updateResult = await collection.updateMany(conditions, update);
        updatedRecords = await Query.getList(collection) as T[];
      } else {
        let updatedDoc = await collection.findOneAndUpdate(
          conditions,
          update,
          {new: true} // return the modified document rather than the original
        );
        if (updatedDoc) {
          updatedRecords = [updatedDoc];
        } else {
          updatedRecords = [];
        }
        
      }

      return updatedRecords;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  };

  static deleteRecord = async <T extends Document>(collection: Model<T>, conditions: any) => {

    try {
      let delResult: DeleteWriteOpResultObject["result"] = await collection.deleteOne(conditions);
      return delResult;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }

  };

  static toObjID = (objId: ObjectId | string) => {
    try {
      let id: ObjectId;

      if (typeof objId === 'string') {
        id = new ObjectId(objId);
        return id;
      } else if ((objId instanceof ObjectId)) {
        id = objId;
        return id;
      }
      return null;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  };

}