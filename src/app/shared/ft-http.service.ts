import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { extend } from 'lodash-es';

@Injectable()
export class FtHttpService {
  constructor(private http: HttpClient) {}

  getDefaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  get(url: string, options?: any): any {
    let headers = this.getDefaultHeaders();
    if (options) {
        headers = extend(headers, options);
    }
    return this.http.get(url, {
        headers: headers
    });
  }

  post(url: string, data: any, options?: any): any {
    let headers = this.getDefaultHeaders();
    if (options) {
        headers = extend(headers, options);
    }
    return this.http.post(url, data, {
      headers: headers
    });
  }
}