import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DatabaseUser } from "../auth/DatabaseUser.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { map } from "rxjs/operators";
import { CreatorService } from "./creator.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-creator-dashboard",
  templateUrl: "./creator-dashboard.component.html",
  styleUrls: ["./creator-dashboard.component.css"],
})
export class CreatorDashboardComponent implements OnInit, AfterViewInit {
  loggedUser: DatabaseUser;
  creatorEmail: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private creatorService: CreatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.creatorEmail = this.authService.getUserEmail();
    this.creatorService.getLoggedUserData(this.creatorEmail);
    this.loggedUser = this.creatorService.loggedUser;
  }

  ngAfterViewInit() {}
}
