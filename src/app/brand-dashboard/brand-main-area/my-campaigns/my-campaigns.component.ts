import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChange,
} from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map, filter } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { NewCampaignComponent } from "../new-campaign/new-campaign.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { CampaignService } from "../campaign.service";
import { BrandDashboardComponent } from "../../brand-dashboard.component";
import { BrandService } from "../../brand.service";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-my-campaigns",
  templateUrl: "./my-campaigns.component.html",
  styleUrls: ["./my-campaigns.component.css"],
})
export class MyCampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];
  private brandName: string;
  brandEmail: string;
  noCampaigns: boolean;
  faPlus = faPlus;
  faTag = faTag;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private brandDashboard: BrandDashboardComponent,
    private campService: CampaignService,
    private ref: ChangeDetectorRef,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();
    this.brandService.getLoggedUserData(this.brandEmail);
    this.campaigns = this.brandService.myCampaigns;

    if (this.campaigns.length == 0) {
      this.noCampaigns = true;
    } else {
      this.noCampaigns = false;
    }
  }

  onDelete(id: string, i: number) {
    let linkArray =
      "https://project-b7a57.firebaseio.com/campaigns/" + id + "/.json";
    this.campService.deleteCampaign(linkArray);

    this.campaigns.splice(i, 1);
  }
}
