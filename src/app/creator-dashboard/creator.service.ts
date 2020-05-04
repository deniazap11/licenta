import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";
import { Campaign } from "../brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { socialAccountInfo } from "./creator-main-area/social-account/socialAccountInfo.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CreatorService {
  loggedUser: DatabaseUser;
  loggedUserId: string;
  myCampaigns: Campaign[] = [];
  mySocials: string[] = [];
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
            this.getUserSubmissionsFromCampaignsDb(this.loggedUser.id);
          }
        }
      });
  }

  checkUserType(userType: string) {
    if (userType == "brand") {
      this.router.navigate(["/not-allowed"]);
    }
  }

  getCampaignsForUser(userId: string) {
    this.http
      .get<{ [key: string]: Campaign }>(
        "https://project-b7a57.firebaseio.com/users/" +
          userId +
          "/submissions.json"
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
          this.myCampaigns[j] = campaignsArray[i];
          j++;
        }
      });
  }

  getUserSubmissionsFromCampaignsDb(userId: string) {
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
        var k = 0;
        for (const i in campaignsArray) {
          for (const j in campaignsArray[i].submissions) {
            if (campaignsArray[i].submissions[j].id == userId) {
              this.myCampaigns[k] = campaignsArray[i];

              k++;
            }
          }
        }
      });
  }

  getSocialUsernames(email: string) {
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
            this.loggedUserId = users[i].id;
            let social: socialAccountInfo = users[i].social;
            var k = 0;
            for (const j in social) {
              this.mySocials[k] = social[j];
              k++;
            }
          }
        }
      });
  }

  deleteSocialFromDatabase(loggedUserId: string, username: string) {
    // this.http
    //   .get<{ [key: string]: DatabaseUser }>(
    //     "https://project-b7a57.firebaseio.com/users.json"
    //   )
    //   .pipe(
    //     map((responseData) => {
    //       const usersArray: DatabaseUser[] = [];
    //       for (const key in responseData) {
    //         if (responseData.hasOwnProperty(key)) {
    //           usersArray.push({ ...responseData[key], id: key });
    //         }
    //       }
    //       return usersArray;
    //     })
    //   )
    //   .subscribe((users) => {
    //     for (const i in users) {
    //       if (users[i].id == loggedUserId) {
    //         let social = users[i].social;
    //         for (const j in social) {
    //           if (social[j].username == username) console.log(social[j].id);
    //         }
    //       }
    //     }
    //   });
  }
}
