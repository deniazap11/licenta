import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSliderChange } from "@angular/material/slider";
import { HttpClient } from "@angular/common/http";
import { stringify } from "querystring";
import { Campaign } from "./campaign.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

export interface Tag {
  name: string;
}

export interface Category {
  name: string;
}

export interface Gender {
  name: string;
}

@Component({
  selector: "app-new-campaign",
  templateUrl: "./new-campaign.component.html",
  styleUrls: ["./new-campaign.component.css"]
})
export class NewCampaignComponent implements OnInit {
  age: number;
  auxBrandName: string;
  tags: Tag[] = [];

  categories: Category[] = [
    { name: "Art" },
    { name: "Beauty" },
    { name: "Health " },
    { name: "Food & Beverages" },
    { name: "Lifestyle" },
    { name: "Entertainment" },
    { name: "Pets" },
    { name: "Fitness" },
    { name: "Travel" },
    { name: "Hobbies" }
  ];

  gender: Gender[] = [{ name: "Any " }, { name: "Female" }, { name: "Male" }];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
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
    const brandEmail = this.authService.getUserEmail();
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
    let tags: string[] = [];
    let i = 0;
    for (var tag of this.tags) {
      tags[i] = tag.name;
      console.log("tags local array " + tags[i]);
      i++;
    }
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

    this.router.navigate(["../my-campaigns"], { relativeTo: this.route });
    form.reset();
  }

  /* chip input stuff */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
