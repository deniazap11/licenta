import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-logged-navbar",
  templateUrl: "./logged-navbar.component.html",
  styleUrls: ["./logged-navbar.component.css"],
})
export class LoggedNavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.addLangs(["en", "ro"]);
    translate.setDefaultLang("en");
  }

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
