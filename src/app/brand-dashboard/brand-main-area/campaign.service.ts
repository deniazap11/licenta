import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";
import { MyCampaignsComponent } from "./my-campaigns/my-campaigns.component";
import { Campaign } from "./new-campaign/campaign.model";

@Injectable({ providedIn: "root" })
export class CampaignService {
  constructor(private http: HttpClient) {}

  storeBrandName(email: string) {
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
            const brandName = users[i].name;
            localStorage.setItem("brandName", JSON.stringify(brandName));
          }
        }
      });
  }

  getBrandName() {
    const brandName: string = JSON.parse(localStorage.getItem("brandName"));
    if (!brandName) {
      return;
    }
    return brandName;
  }

  deleteCampaign(id: string) {
    this.http.delete(id).subscribe();
  }
}
