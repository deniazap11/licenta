import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-brand-sidenav",
  templateUrl: "./brand-sidenav.component.html",
  styleUrls: ["./brand-sidenav.component.css"]
})
export class BrandSidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
