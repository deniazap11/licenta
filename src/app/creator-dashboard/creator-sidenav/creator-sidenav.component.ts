import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-creator-sidenav",
  templateUrl: "./creator-sidenav.component.html",
  styleUrls: ["./creator-sidenav.component.css"],
})
export class CreatorSidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
