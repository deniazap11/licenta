import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-social-account",
  templateUrl: "./social-account.component.html",
  styleUrls: ["./social-account.component.css"],
})
export class SocialAccountComponent implements OnInit {
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  constructor(private http: HttpClient) {}

  ngOnInit() {
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
}
