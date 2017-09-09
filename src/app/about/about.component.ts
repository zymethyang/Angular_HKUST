import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader:Leader[];
  constructor(private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }




  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leader => this.leader = leader);
  }

}
