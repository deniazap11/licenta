import { Component, OnInit } from "@angular/core";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faChess } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-digital-marketing-banner",
  templateUrl: "./digital-marketing-banner.component.html",
  styleUrls: ["./digital-marketing-banner.component.css"]
})
export class DigitalMarketingBannerComponent implements OnInit {
  faDollarSign = faDollarSign;
  faTrophy = faTrophy;
  faChess = faChess;

  constructor() {}

  ngOnInit() {}
}
