import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";
import { Campaign } from "../brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class BrandService {
  loggedUser: DatabaseUser;
  myCampaigns: Campaign[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  getLoggedUserData(email: string) {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map((responseData) => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe((users) => {
        for (const i in users) {
          if (users[i].email == email) {
            this.loggedUser = users[i];
            this.checkUserType(users[i].userType);
            this.getCampaignsForUser(this.loggedUser.name);
          }
        }
      });
  }

  checkUserType(userType: string) {
    if (userType == "creator") {
      this.router.navigate(["/not-allowed"]);
    }
  }

  getCampaignsForUser(name: string) {
    this.http
      .get<{ [key: string]: Campaign }>(
        "https://project-b7a57.firebaseio.com/campaigns.json"
      )
      .pipe(
        map((responseData) => {
          const campaignsArray: Campaign[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              campaignsArray.push({ ...responseData[key], id: key });
            }
          }
          return campaignsArray;
        })
      )
      .subscribe((campaignsArray) => {
        var j = 0;
        for (const i in campaignsArray) {
          if (campaignsArray[i].brandName == name) {
            this.myCampaigns[j] = campaignsArray[i];
            j++;
          }
        }
      });
  }
}
