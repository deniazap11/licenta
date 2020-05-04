import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule, MatDialogConfig } from "@angular/material";
import { MatCardModule } from "@angular/material/card";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { environment } from "../environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import * as firebase from "firebase/app";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./home/header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { BrandBannerComponent } from "./home/brand-banner/brand-banner.component";
import { CreatorBannerComponent } from "./home/creator-banner/creator-banner.component";
import { AboutBannerComponent } from "./home/about-banner/about-banner.component";
import { JoinBannerComponent } from "./home/join-banner/join-banner.component";
import { FooterComponent } from "./home/footer/footer.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { BrandDashboardComponent } from "./brand-dashboard/brand-dashboard.component";
import { CreatorDashboardComponent } from "./creator-dashboard/creator-dashboard.component";
import { BrandSidenavComponent } from "./brand-dashboard/brand-sidenav/brand-sidenav.component";
import { BrandMainAreaComponent } from "./brand-dashboard/brand-main-area/brand-main-area.component";
import { CreatorSidenavComponent } from "./creator-dashboard/creator-sidenav/creator-sidenav.component";
import { CreatorMainAreaComponent } from "./creator-dashboard/creator-main-area/creator-main-area.component";
import { AuthGuard } from "./auth/login/auth.guard";
import { NewCampaignComponent } from "./brand-dashboard/brand-main-area/new-campaign/new-campaign.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyCampaignsComponent } from "./brand-dashboard/brand-main-area/my-campaigns/my-campaigns.component";
import { ViewCreatorsComponent } from "./brand-dashboard/brand-main-area/view-creators/view-creators.component";
import { ViewSubmissionsComponent } from "./brand-dashboard/brand-main-area/view-submissions/view-submissions.component";
import { CreatorTableComponent } from "./brand-dashboard/brand-main-area/view-creators/creator-table/creator-table.component";
import { CampaignFeedComponent } from "./creator-dashboard/creator-main-area/campaign-feed/campaign-feed.component";
import { SocialAccountComponent } from "./creator-dashboard/creator-main-area/social-account/social-account.component";
import { MySubmissionsComponent } from "./creator-dashboard/creator-main-area/my-submissions/my-submissions.component";
import { BrandsComponent } from "./creator-dashboard/creator-main-area/brands/brands.component";
import { BrandTableComponent } from "./creator-dashboard/creator-main-area/brands/brand-table/brand-table.component";
import { CampaignFeedContainerComponent } from "./creator-dashboard/creator-main-area/campaign-feed/campaign-feed-container/campaign-feed-container.component";
import { DigitalMarketingBannerComponent } from "./home/digital-marketing-banner/digital-marketing-banner.component";
import { NewSocialDialogComponent } from "./creator-dashboard/creator-main-area/social-account/new-social-dialog/new-social-dialog.component";
import { LoggedNavbarComponent } from "./logged-navbar/logged-navbar.component";
import { PathNotAllowedComponent } from "./path-not-allowed/path-not-allowed.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "not-allowed", component: PathNotAllowedComponent },
  {
    path: "brand-dashboard",

    component: BrandDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/brand-dashboard/(content:my-campaigns)",
        pathMatch: "full",
      },
      {
        path: "new-campaign",
        component: NewCampaignComponent,
        outlet: "content",
      },
      {
        path: "my-campaigns",
        component: MyCampaignsComponent,
        outlet: "content",
      },
      {
        path: "creators",
        component: ViewCreatorsComponent,
        outlet: "content",
      },
      {
        path: "submissions",
        component: ViewSubmissionsComponent,
        outlet: "content",
      },
    ],
  },
  {
    path: "creator-dashboard",
    component: CreatorDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/creator-dashboard/(content-c:social-account)",
        pathMatch: "full",
      },
      {
        path: "campaign-feed",
        component: CampaignFeedComponent,
        outlet: "content-c",
      },
      {
        path: "social-account",
        component: SocialAccountComponent,
        outlet: "content-c",
      },
      {
        path: "my-submissions",
        component: MySubmissionsComponent,
        outlet: "content-c",
      },
      {
        path: "brands",
        component: BrandsComponent,
        outlet: "content-c",
      },
    ],
  },
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
    BrandMainAreaComponent,
    CreatorSidenavComponent,
    CreatorMainAreaComponent,
    NewCampaignComponent,
    MyCampaignsComponent,
    ViewCreatorsComponent,
    ViewSubmissionsComponent,
    CreatorTableComponent,
    SocialAccountComponent,
    CampaignFeedComponent,
    MySubmissionsComponent,
    BrandsComponent,
    BrandTableComponent,
    CampaignFeedContainerComponent,
    DigitalMarketingBannerComponent,
    NewSocialDialogComponent,
    LoggedNavbarComponent,
    PathNotAllowedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  exports: [MatExpansionModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewSocialDialogComponent],
})
export class AppModule {}
