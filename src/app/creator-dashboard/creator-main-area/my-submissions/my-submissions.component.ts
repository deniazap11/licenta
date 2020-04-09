import { Component, OnInit } from "@angular/core";
import { Campaign } from "src/app/brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { CreatorService } from "../../creator.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import * as $ from "jquery";

@Component({
  selector: "app-my-submissions",
  templateUrl: "./my-submissions.component.html",
  styleUrls: ["./my-submissions.component.css"],
})
export class MySubmissionsComponent implements OnInit {
  faTag = faTag;
  myCampaigns: Campaign[] = [];
  creatorEmail: string;
  loggedUser: DatabaseUser;
  creatorId: string;

  constructor(
    private creatorService: CreatorService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.creatorEmail = this.authService.getUserEmail();
    console.log("x" + this.creatorEmail);
    this.creatorService.getLoggedUserData(this.creatorEmail);
    this.myCampaigns = this.creatorService.myCampaigns;
  }
  ngAfterViewInit() {
    $(document).on("click", ".toggle-text-button", function () {
      // Check if text is more or less
      if ($(this).text() == "Read More") {
        // Change link text
        $(this).text("Read Less");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide down
        $(this).parent().children(".toggle-text").slideDown();
      } else {
        // Change link text
        $(this).text("Read More");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide up
        $(this).parent().children(".toggle-text").slideUp();
      }
    });
  }
}
