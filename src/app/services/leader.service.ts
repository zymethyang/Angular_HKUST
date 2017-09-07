import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable()
export class LeaderService {
  constructor() { }
  getLeader(): Leader {
    return LEADERS.filter((leader) => leader)[3];
  }
  getLeaders():Leader[]{
    return LEADERS;
  }
}
