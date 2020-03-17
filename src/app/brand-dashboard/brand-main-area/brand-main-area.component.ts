import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-brand-main-area",
  templateUrl: "./brand-main-area.component.html",
  styleUrls: ["./brand-main-area.component.css"]
})
export class BrandMainAreaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
