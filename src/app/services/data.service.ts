import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('/api/users')
      .map(result => this.result = result.json().data);
  }
  getNewNumber() {
    return this._http.get('/api/newGame');
  }
  check(num) {
    let body = JSON.stringify({ guess: num });
    return this._http.post('/api/check', body, httpOptions);
  }
  show() {
    return this._http.get('/api/show');
  }
  cpuStartGuess() {
    return this._http.get('/api/firstGuess');
  }
  cpuGuess(g, b, c) {
    let body = JSON.stringify({ cpuGuess: g, bull: b, cow: c });
    return this._http.post('/api/cpuGuess', body, httpOptions);
  }

}
