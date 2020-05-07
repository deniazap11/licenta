import { Component, OnInit, ɵConsole } from "@angular/core";
import { Campaign } from "src/app/brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp, faTag } from "@fortawesome/free-solid-svg-icons";
import * as $ from "jquery";
import { CreatorService } from "src/app/creator-dashboard/creator.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { SearchPipe } from "./search.pipe";

@Component({
  selector: "app-campaign-feed-container",
  templateUrl: "./campaign-feed-container.component.html",
  styleUrls: ["./campaign-feed-container.component.css"],
})
export class CampaignFeedContainerComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faTag = faTag;
  userApplied: boolean;
  active: any = "";
  userSocialMedia: boolean;
  search = "";
  brandNames: string[] = [];
  selectedBrand = "";
  selectedCategory = "";

  campaigns: Campaign[] = [];

  categories: string[] = [
    "Art",
    "Beauty",
    "Health ",
    "Food & Beverages",
    "Lifestyle",
    "Entertainment",
    "Pets",
    "Fitness",
    "Travel",
    "Hobbies",
  ];

  constructor(
    private http: HttpClient,
    private creatorService: CreatorService
  ) {}

  ngOnInit() {
    this.getCampaigns();
    this.getBrandNames();
  }

  ngAfterViewInit() {
    $(document).on("click", ".toggle-text-button", function () {
      // Check if text is more or less
      if ($(this).text() != "READ LESS") {
        // Change link text
        $(this).text("READ LESS");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide down
        $(this).parent().children(".toggle-text").slideDown();
      } else {
        // Change link text
        $(this).text("READ MORE");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide up
        $(this).parent().children(".toggle-text").slideUp();
      }
    });
  }

  getCampaigns() {
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
          if (campaignsArray[i].id == id) {
            campaign = campaignsArray[i];
          }
        }
      });

    return campaign;
  }

  async checkUserApplied(
    campaignId: string,
    userEmail: string,
    loggedUser: DatabaseUser,
    userId: string,
    campaign: Campaign
  ) {
    let userApplied: number = 0;

    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/campaigns/" +
          campaignId +
          "/submissions.json"
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
      .subscribe((usersArray) => {
        for (const i in usersArray) {
          if (usersArray[i].email == userEmail) {
            userApplied++;
          }
        }
        if (userApplied == 0) {
          this.userApplied = false;
          this.addSubmissionToDatabase(
            true,
            campaignId,
            loggedUser,
            userId,
            campaign
          );
        } else {
          this.userApplied = true;
        }
      });
  }

  async checkSocialMedia(
    userEmail: string,
    i: any,
    campaign: Campaign,
    loggedUser: DatabaseUser
  ) {
    this.active = i;

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
      .subscribe((usersArray) => {
        for (const i in usersArray) {
          if (usersArray[i].email == userEmail) {
            if (usersArray[i].social) {
              this.userSocialMedia = true;
              this.checkUserApplied(
                campaign.id,
                loggedUser.email,
                loggedUser,
                loggedUser.id,
                campaign
              );
            } else {
              this.userSocialMedia = false;
            }
          }
        }
      });
  }

  addSubmissionToDatabase(
    userApplied: boolean,
    campaignId: string,
    loggedUser: DatabaseUser,
    userId: string,
    campaign: Campaign
  ) {
    //add user to campaign table
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/campaigns/" +
          campaignId +
          "/submissions.json",
        loggedUser
      )
      .subscribe((responseData) => {
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
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  applyForCampaign(campaign, i) {
    const loggedUser: DatabaseUser = this.creatorService.loggedUser; //get logged in user data
    const userId = loggedUser.id;
    const userEmail = loggedUser.email;
    const campaignId = campaign.id;

    //check if user added social media
    this.checkSocialMedia(userEmail, i, campaign, loggedUser);
  }

  getBrandNames() {
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
      .subscribe((usersArray) => {
        let j = 0;
        for (const i in usersArray) {
          if (usersArray[i].userType == "brand") {
            this.brandNames[j] = usersArray[i].name;
            j++;
          }
        }
      });
  }
}
