import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-logged-navbar",
  templateUrl: "./logged-navbar.component.html",
  styleUrls: ["./logged-navbar.component.css"],
})
export class LoggedNavbarComponent implements OnInit {
  navbarOpen = false;
  sidenavOpen = false;

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.addLangs(["en", "ro"]);
    translate.setDefaultLang("en");
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }

  openSidenav() {
    if (this.sidenavOpen == false) {
      (<HTMLInputElement>(
        document.getElementById("sidebar-wrapper")
      )).classList.add("show-sidebar");
    } else {
      (<HTMLInputElement>(
        document.getElementById("sidebar-wrapper")
      )).classList.remove("show-sidebar");
    }
    this.sidenavOpen = !this.sidenavOpen;
  }
}
