import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { User } from "./user.model";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase/app";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new Subject<User>();

  private userList: AngularFireList<any>;

  constructor(private http: HttpClient, private firebase: AngularFireDatabase) {
    this.userList = this.firebase.list("users");
  }

  getUserType() {
    return this.userList;
  }

  addToDatabase(userType: string, name: string, email: string) {
    if (userType == "brand") {
      firebase
        .database()
        .ref("users/brands/")
        .push({
          userType: userType,
          name: name,
          email: email
        });
    } else {
      firebase
        .database()
        .ref("users/creators/")
        .push({
          userType: userType,
          name: name,
          email: email
        });
    }
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0dpfNc2c6zyb_or06OD3Zc1RTgNnDuUM",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0dpfNc2c6zyb_or06OD3Zc1RTgNnDuUM",
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is not correct.";
        break;
    }
    return throwError(errorMessage);
  }
}
