import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NewSocialDialogComponent } from "./new-social-dialog/new-social-dialog.component";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { AuthService } from "src/app/auth/auth.service";
import { map } from "rxjs/operators";
import { CreatorService } from "../../creator.service";
import { socialAccountInfo } from "./socialAccountInfo.model";

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
  loggedUserId: string;
  mySocials: string[] = [];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private creatorService: CreatorService
  ) {}

  ngOnInit() {
    this.loggedUserEmail = this.authService.getUserEmail();
    this.creatorService.getSocialUsernames(this.loggedUserEmail);
    this.mySocials = this.creatorService.mySocials;
    console.log(this.mySocials);
  }

  getSocialMedia(userId: string, socialUsername: string) {
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

    let mySocials = this.mySocials;
    let newProfilePicUrl, newName, newUsername, newNumberOfPosts, newFollowers;
    let newSocialAccountInfo: socialAccountInfo;
    const component = this;

    $.ajax({
      url: "https://www.instagram.com/" + socialUsername + "?__a=1",
      type: "get",
      success: function (response) {
        newProfilePicUrl = response.graphql.user.profile_pic_url;
        newName = response.graphql.user.full_name;
        newUsername = response.graphql.user.username;
        newNumberOfPosts =
          response.graphql.user.edge_owner_to_timeline_media.count;
        newFollowers = nFormatter(response.graphql.user.edge_followed_by.count);

        newSocialAccountInfo = {
          profilePicUrl: newProfilePicUrl,
          name: newName,
          username: newUsername,
          numberOfPosts: newNumberOfPosts,
          followers: newFollowers,
        };
        console.log(newSocialAccountInfo);

        component.addSocialToThisUser(userId, newSocialAccountInfo);
      },
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: "New Social Media Account",
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
            this.getSocialMedia(users[i].id, username);
          }
        }
      });
  }

  addSocialToThisUser(userId: string, newSocialAccountInfo: socialAccountInfo) {
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/users/" + userId + "/social.json",
        newSocialAccountInfo
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
    window.location.reload();
  }

  onDeleteSocialMedia(i: number, username: string) {
    this.loggedUserId = this.creatorService.loggedUserId;
    console.log("works " + this.loggedUserId);

    // let linkArray =
    //   "https://project-b7a57.firebaseio.com/users/" +
    //   this.loggedUserId +
    //   "social/" +
    //   "/.json";

    this.creatorService.deleteSocialFromDatabase(this.loggedUserId, username);

    this.mySocials.splice(i, 1);
  }
}
