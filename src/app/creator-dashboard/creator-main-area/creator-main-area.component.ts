import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-creator-main-area",
  templateUrl: "./creator-main-area.component.html",
  styleUrls: ["./creator-main-area.component.css"]
})
export class CreatorMainAreaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
