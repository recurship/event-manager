import BaseService from "./base";


export default class EventService extends BaseService {


  getAll() {
    return this.makeRequest('/api/events');
  }

}