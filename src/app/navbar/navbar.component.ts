import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  private userSub: Subscription;
  isAuthenticated = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });

    // if (!this.isAuthenticated) {
    //   this.router.navigate(["/login"]);
    // }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
