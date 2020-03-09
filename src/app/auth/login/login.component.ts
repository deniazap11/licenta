import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  getUserData(uid) {
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", snap => {
        console.log(snap.val());
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
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.getUserData(user.uid);
      } else console.log("not working");
    });
  }
}
