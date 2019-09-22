interface getListQuery {
  q: any,
  o: any
}

export class QueryUtil<T> {

  action: T | any;

  /**
   * @param clientQuery queryString from client
   */
  getList = async (clientQuery: any) => {

    if (clientQuery.query) {
      // when query parameter "query" is provided,
      // it should contain both search criteria and search options
      let queryString = clientQuery.query; // The query string passed from frontend. Note: NOT koa's querystring
      let query: getListQuery;

      try {
        query = JSON.parse(queryString);
      } catch (error) {
        console.error(error);
        return {
          message: "Incorrect JSON format detected from query parameter \"query\""
        };
      }

      let conditions = query.q || {};
      let options = query.o;

      let result = await this.action.getList(conditions, options);

      return  result;

    } else {
      // when query parameter "query" is not provided,
      // it means just requesting to search database with no options

      let conditions = clientQuery;

      let result = await this.action.getList(conditions);

      return result;
    }

  };

  constructor(_action: T) {
    this.action = _action;
  }

}