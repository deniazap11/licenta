import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { BrandService } from "../../brand.service";
import { Campaign } from "../new-campaign/campaign.model";

@Component({
  selector: "app-view-submissions",
  templateUrl: "./view-submissions.component.html",
  styleUrls: ["./view-submissions.component.css"]
})
export class ViewSubmissionsComponent implements OnInit {
  brandEmail: string;
  campaigns: Campaign[] = [];
  constructor(
    private authService: AuthService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();
    this.brandService.getLoggedUserData(this.brandEmail);
    this.campaigns = this.brandService.myCampaigns;
  }
}
