import { Component, OnInit } from "@angular/core";
import { Campaign } from "src/app/brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as $ from "jquery";
import { CreatorService } from "src/app/creator-dashboard/creator.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";

@Component({
  selector: "app-campaign-feed-container",
  templateUrl: "./campaign-feed-container.component.html",
  styleUrls: ["./campaign-feed-container.component.css"]
})
export class CampaignFeedContainerComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  campaigns: Campaign[] = [];

  constructor(
    private http: HttpClient,
    private creatorService: CreatorService
  ) {}

  ngOnInit() {
    this.getCampaigns();
  }

  ngAfterViewInit() {
    $(document).on("click", ".toggle-text-button", function() {
      // Check if text is more or less
      if ($(this).text() == "Read More") {
        // Change link text
        $(this).text("Read Less");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide down
        $(this)
          .parent()
          .children(".toggle-text")
          .slideDown();
      } else {
        // Change link text
        $(this).text("Read More");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide up
        $(this)
          .parent()
          .children(".toggle-text")
          .slideUp();
      }
    });
  }

  getCampaigns() {
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
          this.campaigns[j] = campaignsArray[i];
          j++;
        }
      });
  }

  showDetails = false;

  onReadBtn(id) {
    console.log(id);

    if (this.showDetails == false) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }

  getCampaignById(id: string) {
    let campaign: Campaign;

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
          if (campaignsArray[i].id == id) {
            campaign = campaignsArray[i];
          }
        }
      });

    return campaign;
  }

  checkUserApplied(campaignId: string, userEmail: string) {
    let userApplied: boolean;
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/campaigns/" +
          campaignId +
          "/submissions.json"
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
      .subscribe(usersArray => {
        for (const i in usersArray) {
          if (usersArray[i].email == userEmail) {
            userApplied = true;
            console.log(userApplied);
            break;
          }
          userApplied = false;
        }
      });

    return userApplied;
  }

  addSubmissionToDatabase(
    userApplied: boolean,
    campaignId: string,
    loggedUser: DatabaseUser,
    userId: string,
    campaign: Campaign
  ) {
    console.log("x" + userApplied);

    if (userApplied == false) {
      //add user to campaign table
      console.log("if userapplied " + userApplied);
      this.http
        .post<{ name: string }>(
          "https://project-b7a57.firebaseio.com/campaigns/" +
            campaignId +
            "/submissions.json",
          loggedUser
        )
        .subscribe(responseData => {
          console.log(responseData);
        });

      //add campaign to user table
      this.http
        .post<{ name: string }>(
          "https://project-b7a57.firebaseio.com/users/" +
            userId +
            "/submissions.json",
          campaign
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
    } else {
      console.log("else " + userApplied);
    }
  }

  applyForCampaign(campaign) {
    const loggedUser: DatabaseUser = this.creatorService.loggedUser; //get logged in user data
    const userId = loggedUser.id;
    const userEmail = loggedUser.email;
    const campaignId = campaign.id;

    //check if user already applied
    let userApplied = this.checkUserApplied(campaignId, userEmail);

    //add submissions to database
    this.addSubmissionToDatabase(
      userApplied,
      campaignId,
      loggedUser,
      userId,
      campaign
    );
  }
}
