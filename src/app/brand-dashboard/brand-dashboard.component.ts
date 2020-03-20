import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { CampaignService } from "./brand-main-area/campaign.service";

@Component({
  selector: "app-brand-dashboard",
  templateUrl: "./brand-dashboard.component.html",
  styleUrls: ["./brand-dashboard.component.css"]
})
export class BrandDashboardComponent implements OnInit {
  brandEmail: string;
  brandName: string;
  constructor(
    private authService: AuthService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();
    this.campaignService.storeBrandName(this.brandEmail);
    this.brandName = this.campaignService.getBrandName();
  }
}
