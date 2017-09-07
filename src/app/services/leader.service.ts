import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable()
export class LeaderService {
  constructor() { }
  getLeader(): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => (LEADERS.filter((leader) => leader)[3]), 2000);
    });
  }
  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      setTimeout(() => (LEADERS), 2000);
    });
  }
}
