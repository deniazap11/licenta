import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { environment } from "../environments/environment";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import * as firebase from "firebase/app";

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
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrandDashboardComponent } from "./brand-dashboard/brand-dashboard.component";
import { CreatorDashboardComponent } from "./creator-dashboard/creator-dashboard.component";
import { BrandSidenavComponent } from './brand-dashboard/brand-sidenav/brand-sidenav.component';
import { BrandMainAreaComponent } from './brand-dashboard/brand-main-area/brand-main-area.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "brand-dashboard", component: BrandDashboardComponent },
  { path: "creator-dashboard", component: CreatorDashboardComponent }
];

firebase.initializeApp(environment.firebase);

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
    LoadingSpinnerComponent,
    BrandDashboardComponent,
    CreatorDashboardComponent,
    BrandSidenavComponent,
    BrandMainAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
