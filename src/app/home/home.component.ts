import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "../auth/DatabaseUser.model";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import * as $ from "jquery";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        $("nav").addClass("shrink");
      } else {
        $("nav").removeClass("shrink");
      }
    });
  }
}
