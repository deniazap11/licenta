import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-logged-navbar",
  templateUrl: "./logged-navbar.component.html",
  styleUrls: ["./logged-navbar.component.css"],
})
export class LoggedNavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
