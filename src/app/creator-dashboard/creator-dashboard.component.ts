import { Component, OnInit } from "@angular/core";
import { DatabaseUser } from "../auth/DatabaseUser.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { map } from "rxjs/operators";
import { CreatorService } from "./creator.service";

@Component({
  selector: "app-creator-dashboard",
  templateUrl: "./creator-dashboard.component.html",
  styleUrls: ["./creator-dashboard.component.css"]
})
export class CreatorDashboardComponent implements OnInit {
  loggedUser: DatabaseUser;
  creatorEmail: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private creatorService: CreatorService
  ) {}

  ngOnInit() {
    this.creatorEmail = this.authService.getUserEmail();
    console.log(this.creatorEmail);
    this.creatorService.getLoggedUserData(this.creatorEmail);
    this.loggedUser = this.creatorService.loggedUser;
  }
}
