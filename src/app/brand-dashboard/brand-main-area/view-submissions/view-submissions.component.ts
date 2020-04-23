import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { BrandService } from "../../brand.service";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import {
  faEnvelope,
  faCheckSquare,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-view-submissions",
  templateUrl: "./view-submissions.component.html",
  styleUrls: ["./view-submissions.component.css"],
})
export class ViewSubmissionsComponent implements OnInit {
  brandEmail: string;
  campaigns: Campaign[] = [];
  faEnvelope = faEnvelope;
  faCheckSquare = faCheckSquare;
  faPlusSquare = faPlusSquare;
  constructor(
    private authService: AuthService,
    private brandService: BrandService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();
    this.brandService.getLoggedUserData(this.brandEmail);
    this.campaigns = this.brandService.myCampaigns;
  }

  onAcceptCreator(userId: string, campaignId: string, submissionId: string) {
    console.log("works" + userId + " and " + campaignId);
    console.log(submissionId);
    const status = { status: "accepted" };
    //add status to campaigns db
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/campaigns/" +
          campaignId +
          "/submissions/" +
          submissionId +
          "/status.json",
        JSON.stringify(status)
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });

    //   //add status to users db
    //   this.http
    //   .post<{ name: string }>(
    //     "https://project-b7a57.firebaseio.com/users/" +
    //       userId +
    //       "/submissions.json",
    //     campaign
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });

    window.location.reload();
  }
}
