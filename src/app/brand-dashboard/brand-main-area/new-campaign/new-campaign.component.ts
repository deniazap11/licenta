import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSliderChange } from "@angular/material/slider";
import { HttpClient } from "@angular/common/http";
import { stringify } from "querystring";
import { Campaign } from "./campaign.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-campaign",
  templateUrl: "./new-campaign.component.html",
  styleUrls: ["./new-campaign.component.css"]
})
export class NewCampaignComponent implements OnInit {
  age: number;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  formatLabel(value: number) {
    return value;
  }

  onInputChange(event: MatSliderChange) {
    this.age = event.value;
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

    this.addNewCampaign({
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
