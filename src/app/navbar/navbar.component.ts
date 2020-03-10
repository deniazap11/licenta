import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import * as firebase from "firebase/app";

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

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
