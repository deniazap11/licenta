import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { CampaignService } from "../brand-dashboard/brand-main-area/campaign.service";
import { MyCampaignsComponent } from "../brand-dashboard/brand-main-area/my-campaigns/my-campaigns.component";
import { DatabaseUser } from "../auth/DatabaseUser.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  private userSub: Subscription;
  isAuthenticated = false;
  loggedUser: DatabaseUser;
  loggedUserEmail: string;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
