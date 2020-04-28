import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { BrandService } from "../../brand.service";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import {
  faEnvelope,
  faCheckSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "src/assets/js/smtp.js";
declare let Email: any;

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
  faPlus = faPlus;
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

  onAcceptCreator(
    userId: string,
    campaignId: string,
    submissionId: string,
    userEmail: string,
    campaign: Campaign
  ) {
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

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "deni.azap11@gmail.com",
      Password: "1F605CF1AE0BDD8AF31AD43A8964039AD084",
      To: userEmail,
      From: "deni.azap11@gmail.com",
      Subject: "Congrats! Your submission was accepted!",
      Body: `
      <p>You have been accepted to a campaign!</p><p>Please check your dashboard on Marketings to find out everything about it.</p>`,
    }).then((message) => {
      alert(message);
    });

    window.location.reload();
  }
}
