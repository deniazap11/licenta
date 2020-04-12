import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NewSocialDialogComponent } from "./new-social-dialog/new-social-dialog.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { AuthService } from "src/app/auth/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-social-account",
  templateUrl: "./social-account.component.html",
  styleUrls: ["./social-account.component.css"],
})
export class SocialAccountComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  loggedUser: DatabaseUser;
  loggedUserEmail: string;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedUserEmail = this.authService.getUserEmail();
    this.getSocialMedia();
  }

  getSocialMedia() {
    function nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      }
      return num;
    }

    $.ajax({
      url: "https://www.instagram.com/zoesugg?__a=1",
      type: "get",
      success: function (response) {
        $(".profile-pic").attr("src", response.graphql.user.profile_pic_url);
        $(".name").html(response.graphql.user.full_name);
        $(".biography").html(response.graphql.user.biography);
        $(".username").html(response.graphql.user.username);
        $(".number-of-posts").html(
          response.graphql.user.edge_owner_to_timeline_media.count
        );
        $(".followers").html(
          nFormatter(response.graphql.user.edge_followed_by.count)
        );
      },
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners",
    };

    dialogConfig.minHeight = 250;
    dialogConfig.minWidth = 300;

    this.dialog.open(NewSocialDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(NewSocialDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data.username != null) {
        this.addSocialToDatabase(this.loggedUserEmail, data.username);
      } else {
        console.log("No username");
      }
    });
  }

  addSocialToDatabase(email: string, username: string) {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map((responseData) => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe((users) => {
        for (const i in users) {
          if (users[i].email == email) {
            this.addSocialToThisUser(users[i].id, username);
          }
        }
      });
  }

  addSocialToThisUser(userId: string, username: string) {
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/users/" + userId + "/social.json",
        JSON.stringify(username)
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
