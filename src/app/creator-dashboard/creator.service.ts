import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CreatorService {
  loggedUser: DatabaseUser;
  constructor(private http: HttpClient) {}

  getLoggedUserData(email: string) {
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
            this.loggedUser = users[i];
            console.log(this.loggedUser);
          }
        }
      });
  }
}
