import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable()
export class LeaderService {
  constructor() { }
  getLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader)[3]);
  }
  getLeaders():Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }
}
