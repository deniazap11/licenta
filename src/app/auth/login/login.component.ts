import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Router } from "@angular/router";

import { map } from "rxjs/operators";
import { DatabaseUser } from "../DatabaseUser.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  navigateByUserType(email: string) {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map(responseData => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe(users => {
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.navigateByUserType(email);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
