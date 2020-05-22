import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CreatorService } from "../creator-dashboard/creator.service";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient,
    private crtService: CreatorService
  ) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.addTokenToUserDB(token, this.crtService.loggedUser);
      },
      (err) => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }

  addTokenToUserDB(token, loggedUser) {
    const auxtoken = { token: token, user: loggedUser };
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/push-notifications.json",
        auxtoken
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
      this.showCustomNotification(payload);
    });
  }

  showCustomNotification(payload: any) {
    let notify_data = payload["notification"];
    let title = notify_data["title"];
    let options = {
      body: notify_data["body"],
      icon: "./assets/images/logo4.png",
      badge: "./assets/images/logo4.png",
      // image: "./assets/images/logo4.png",
    };
    console.log("new msg received: ", notify_data);
    let notify: Notification = new Notification(title, options);

    notify.onclick = (event) => {
      event.preventDefault();
      window.location.href = "http://localhost:4200";
    };
  }

  sendPushNotification(token) {
    let url = "https://fcm.googleapis.com/fcm/send";
    let body = {
      notification: {
        title: "Congrats!",
        body: "You have been accepted to a campaign!",
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      data: {
        hello:
          "Your request to take part in a campaign has just been accepted!",
      },
      to: token,
    };

    let _options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "key=AAAANp4qE2g:APA91bEc8wM55zTWDHO71GvFplT1bMkxGpl9PQdtGYn0EgbJhVOGtjvnGn2LNg-a-XhOMnFji59sdHzoBDAHfKJMH5YI53v0h-qyl3XAFZyULB4JTc4bYEt0IvrYklmh_z58tc20x2ij",
      }),
    };

    this.http
      .post(url, body, _options)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .subscribe((data) => {
        //post doesn't fire if it doesn't get subscribed to
        console.log(data);
      });
  }
}
