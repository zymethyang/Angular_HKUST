import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';

@Injectable()
export class LeaderService {
  constructor(private http: Http,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL+'leaders')
    .map(res => {return this.processHTTPMsgService.extractData(res);});
  }
  getLeader(): Observable<Leader> {
    return this.http.get(baseURL+'leaders?featured=true')
    .map(res => {return this.processHTTPMsgService.extractData(res);});
  }

}
