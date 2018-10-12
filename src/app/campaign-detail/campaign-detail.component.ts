import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  campaign = {};

  ngOnInit() {
    this.getCampaignDetails(this.route.snapshot.params['id']);
  }

  getCampaignDetails(id) {
    this.api.getCampaign(id)
      .subscribe(data => {
        console.log("gcd: ", data);
        this.campaign = data;
      });
  }

  deleteCampaign(id) {
    this.api.deleteCampaign(id)
      .subscribe(res => {
          this.router.navigate(['/campaigns']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
