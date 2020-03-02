import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./home/header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BrandBannerComponent } from "./home/brand-banner/brand-banner.component";
import { CreatorBannerComponent } from "./home/creator-banner/creator-banner.component";
import { AboutBannerComponent } from "./home/about-banner/about-banner.component";
import { JoinBannerComponent } from "./home/join-banner/join-banner.component";
import { FooterComponent } from "./footer/footer.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginFormComponent } from "./login/login-form/login-form.component";
import { SignupFormComponent } from "./signup/signup-form/signup-form.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BrandBannerComponent,
    CreatorBannerComponent,
    AboutBannerComponent,
    JoinBannerComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
