import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  images = [
    "/assets/images/6.jpg",
    "/assets/images/4.jpg",
    "/assets/images/3.jpg",
    "/assets/images/1.jpg",
    "/assets/images/2.jpg"
  ];
  constructor() {}

  ngOnInit() {}
}
