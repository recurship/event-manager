import BaseService from "./base";


export default class EventService extends BaseService {


  getAll() {
    return this.makeRequest('/api/events/');
  }

  add(event) {
    return this.makeRequest('/api/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
  }

}