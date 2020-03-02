import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  isBrand = true;

  switchBrandAccount() {
    this.isBrand = true;
  }
  switchCreatorAccount() {
    this.isBrand = false;
  }

  constructor() {}

  ngOnInit() {}
}
