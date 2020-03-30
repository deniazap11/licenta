import { Component, OnInit } from "@angular/core";
import { Campaign } from "src/app/brand-dashboard/brand-main-area/new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import * as $ from "jquery";

@Component({
  selector: "app-campaign-feed-container",
  templateUrl: "./campaign-feed-container.component.html",
  styleUrls: ["./campaign-feed-container.component.css"]
})
export class CampaignFeedContainerComponent implements OnInit {
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  campaigns: Campaign[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCampaigns();
  }

  ngAfterViewInit() {
    $(document).on("click", ".toggle-text-button", function() {
      // Check if text is more or less
      if ($(this).text() == "Read More") {
        // Change link text
        $(this).text("Read Less");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide down
        $(this)
          .parent()
          .children(".toggle-text")
          .slideDown();
      } else {
        // Change link text
        $(this).text("Read More");

        // Travel up DOM tree to parent, then find any children with CLASS .toggle-text and slide up
        $(this)
          .parent()
          .children(".toggle-text")
          .slideUp();
      }
    });
  }

  getCampaigns() {
    this.http
      .get<{ [key: string]: Campaign }>(
        "https://project-b7a57.firebaseio.com/campaigns.json"
      )
      .pipe(
        map(responseData => {
          const campaignsArray: Campaign[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              campaignsArray.push({ ...responseData[key], id: key });
            }
          }
          return campaignsArray;
        })
      )
      .subscribe(campaignsArray => {
        var j = 0;
        for (const i in campaignsArray) {
          this.campaigns[j] = campaignsArray[i];
          j++;
        }
      });
  }

  showDetails = false;

  onReadBtn(id) {
    console.log(id);

    if (this.showDetails == false) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }
}
