import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map, filter } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { NewCampaignComponent } from "../new-campaign/new-campaign.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { CampaignService } from "../campaign.service";
import { BrandDashboardComponent } from "../../brand-dashboard.component";

@Component({
  selector: "app-my-campaigns",
  templateUrl: "./my-campaigns.component.html",
  styleUrls: ["./my-campaigns.component.css"]
})
export class MyCampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];
  private brandName: string;
  noCampaigns: boolean;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private brandDashboard: BrandDashboardComponent,
    private campService: CampaignService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.brandName = this.brandDashboard.brandName;
    this.getCampaigns(this.brandName);

    if (this.campaigns.length == 0) {
      this.noCampaigns = true;
    } else {
      this.noCampaigns = false;
    }
  }

  getCampaigns(brandName: string) {
    this.http
      .get<{ [key: string]: Campaign }>(
        "https://project-b7a57.firebaseio.com/campaigns.json"
      )
      .pipe(
        map(responseData => {
          const campaignsArray: Campaign[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              campaignsArray.push({ ...responseData[key], id: key });
            }
          }
          return campaignsArray;
        })
      )
      .subscribe(campaignsArray => {
        var j = 0;
        for (const i in campaignsArray) {
          if (campaignsArray[i].brandName == brandName) {
            this.campaigns[j] = campaignsArray[i];
            j++;
          }
        }
      });
  }

  onDelete(id: string, i: number) {
    let linkArray =
      "https://project-b7a57.firebaseio.com/campaigns/" + id + "/.json";
    this.campService.deleteCampaign(linkArray);

    this.campaigns.splice(i, 1);
  }
}
