import { Component, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { NewCampaignComponent } from "../new-campaign/new-campaign.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { Router } from "@angular/router";
import { CampaignService } from "../campaign.service";
import { BrandDashboardComponent } from "../../brand-dashboard.component";

@Component({
  selector: "app-my-campaigns",
  templateUrl: "./my-campaigns.component.html",
  styleUrls: ["./my-campaigns.component.css"]
})
export class MyCampaignsComponent implements OnInit {
  private campaigns: Campaign[] = [];
  private brandName: string;
  private name: string;
  private description: string;
  private category: string;
  private brief: string;
  private todo: string;
  private dont: string;
  private tags: string;
  private gender: string;
  private age: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private brandDashboard: BrandDashboardComponent,
    private campService: CampaignService
  ) {}

  ngOnInit() {
    this.brandName = this.brandDashboard.brandName;
    console.log("in my campaign: " + this.brandName);
    this.getCampaigns(this.brandName);
    this.printCampaigns();
  }

  printCampaigns() {
    for (let i = 0; i < this.campaigns.length; i++) {
      console.log(
        this.campaigns[i].name +
          " " +
          this.campaigns[i].description +
          " " +
          this.campaigns[i].age
      );
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

            // campaigns[j].name = campaignsArray[i].name;

            // campaigns[j].description = campaignsArray[i].description;

            // campaigns[j].category = campaignsArray[i].category;

            // campaigns[j].brief = campaignsArray[i].brief;

            // campaigns[j].todo = campaignsArray[i].todo;

            // campaigns[j].dont = campaignsArray[i].dont;

            // campaigns[j].tags = campaignsArray[i].tags;

            // campaigns[j].gender = campaignsArray[i].gender;

            // campaigns[j].age = campaignsArray[i].age;

            // j++;
          }
        }
      });
  }
}
