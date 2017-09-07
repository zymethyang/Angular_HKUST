import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {
  constructor() { }
  getLeaders(): Observable<Leader[]> {
    return Observable.of(LEADERS).delay(2000);
  }
  getLeader(): Observable<Leader> {
    return Observable.of(LEADERS.filter((leader) => leader)[3]).delay(2000);
  }

}
