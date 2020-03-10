import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.controls["name"].value;
    const userType = form.controls["role"].value;

    this.isLoading = true;

    this.authService.signup(email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        if (userType == "brand") this.router.navigate(["/brand-dashboard"]);
        else this.router.navigate(["/creator-dashboard"]);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authService.addUserToDatabase({ userType, name, email });
    form.reset();
  }

  ngOnInit() {}
}
