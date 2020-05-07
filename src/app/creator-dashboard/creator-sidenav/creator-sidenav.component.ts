import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessagingService } from "src/app/push-notification/messaging.service";

@Component({
  selector: "app-creator-sidenav",
  templateUrl: "./creator-sidenav.component.html",
  styleUrls: ["./creator-sidenav.component.css"],
})
export class CreatorSidenavComponent implements OnInit {
  message;
  title = "push-notification";

  constructor(private router: Router, private msgService: MessagingService) {}

  ngOnInit() {
    this.msgService.requestPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }
}
