import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { CampaignService } from "../brand-dashboard/brand-main-area/campaign.service";
import { MyCampaignsComponent } from "../brand-dashboard/brand-main-area/my-campaigns/my-campaigns.component";
import { DatabaseUser } from "../auth/DatabaseUser.model";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    translate.addLangs(["en", "ro"]);
    translate.setDefaultLang("en");
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ro/) ? browserLang : "en");
  }

  onLogout() {
    this.authService.logout();
  }

  onDashboardClick() {
    let email = this.authService.getUserEmail();
    console.log(email);
    this.navigateByUserType(email);
  }

  navigateByUserType(email: string) {
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
      .subscribe((users) => {
        for (const i in users) {
          if (users[i].email == email) {
            if (users[i].userType == "brand") {
              this.router.navigate(["/brand-dashboard"]);
            } else {
              this.router.navigate(["/creator-dashboard"]);
            }
          }
        }
      });
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
