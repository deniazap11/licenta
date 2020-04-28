import { Component, OnInit } from "@angular/core";
import { Campaign } from "src/app/brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { CreatorService } from "../../creator.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import {
  faTag,
  faCheckCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import { MatExpansionModule } from "@angular/material/expansion";

import * as $ from "jquery";

@Component({
  selector: "app-my-submissions",
  templateUrl: "./my-submissions.component.html",
  styleUrls: ["./my-submissions.component.css"],
})
export class MySubmissionsComponent implements OnInit {
  faTag = faTag;
  faCheckCircle = faCheckCircle;
  faPauseCircle = faPauseCircle;
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
    this.creatorService.getLoggedUserData(this.creatorEmail);
    this.myCampaigns = this.creatorService.myCampaigns;
  }
}
