import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSliderChange } from "@angular/material/slider";
import { HttpClient } from "@angular/common/http";
import { stringify } from "querystring";
import { Campaign } from "./campaign.model";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-new-campaign",
  templateUrl: "./new-campaign.component.html",
  styleUrls: ["./new-campaign.component.css"]
})
export class NewCampaignComponent implements OnInit {
  age: number;
  auxBrandName: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  formatLabel(value: number) {
    return value;
  }

  onInputChange(event: MatSliderChange) {
    this.age = event.value;
  }

  getBrandName(email: string) {
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
            this.auxBrandName = users[i].name;
          }
        }
      });
  }

  ngOnInit() {
    const brandEmail = this.authService.searchUserName();
    console.log("auxbrandemail " + brandEmail);
    this.getBrandName(brandEmail);
  }

  addNewCampaign(postData: Campaign) {
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/campaigns.json",
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onSubmitNewCampaign(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.name;
    const description = form.value.description;
    const category = form.controls["category"].value;
    const brief = form.value.brief;
    const todo = form.value.todo;
    const dont = form.value.dont;
    const tags = form.value.tags;
    const gender = form.controls["gender"].value;
    const age = "16 - " + this.age;

    const brandName = this.auxBrandName;

    this.addNewCampaign({
      brandName,
      name,
      description,
      category,
      brief,
      todo,
      dont,
      tags,
      gender,
      age
    });

    form.reset();
  }
}
