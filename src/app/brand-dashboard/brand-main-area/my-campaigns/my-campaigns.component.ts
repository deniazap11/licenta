import { Component, OnInit } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { NewCampaignComponent } from "../new-campaign/new-campaign.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-campaigns",
  templateUrl: "./my-campaigns.component.html",
  styleUrls: ["./my-campaigns.component.css"]
})
export class MyCampaignsComponent implements OnInit {
  private campaigns: Campaign[];
  private brandEmail: string;
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
    private router: Router
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();

    this.setBrandName(this.brandEmail);

    console.log("Ssa" + this.brandName);
    // const auxBrandName = this.brandName;
    // console.log(auxBrandName);
    // this.getCampaigns(this.brandName);
  }

  setBrandName(email: string) {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map(responseData => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe(users => {
        for (const i in users) {
          if (users[i].email == email) {
            this.brandName = users[i].name;
            console.log(this.brandName);
          }
        }
      });
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
      .subscribe(campaigns => {
        for (const i in campaigns) {
          if (campaigns[i].brandName == brandName) {
            this.name = campaigns[i].name;
            console.log(campaigns[i].name);
            this.description = campaigns[i].description;
            this.category = campaigns[i].category;
            this.brief = campaigns[i].brief;
            this.todo = campaigns[i].todo;
            this.dont = campaigns[i].dont;
            this.tags = campaigns[i].tags;
            this.gender = campaigns[i].gender;
            this.age = campaigns[i].age;
          }
        }
      });
  }
}
