import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { BrandService } from "../../brand.service";
import { Campaign } from "../new-campaign/campaign.model";
import { HttpClient } from "@angular/common/http";
import {
  faEnvelope,
  faCheckSquare,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "src/assets/js/smtp.js";
import { MessagingService } from "src/app/push-notification/messaging.service";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";
declare let Email: any;

@Component({
  selector: "app-view-submissions",
  templateUrl: "./view-submissions.component.html",
  styleUrls: ["./view-submissions.component.css"],
})
export class ViewSubmissionsComponent implements OnInit {
  brandEmail: string;
  campaigns: Campaign[] = [];
  faEnvelope = faEnvelope;
  faCheckSquare = faCheckSquare;
  faPlus = faPlus;
  faCheck = faCheck;
  buttonText = "accept";
  clicked = false;
  clickedIndex;
  constructor(
    private authService: AuthService,
    private brandService: BrandService,
    private http: HttpClient,
    private msgService: MessagingService
  ) {}

  ngOnInit() {
    this.brandEmail = this.authService.getUserEmail();
    this.brandService.getLoggedUserData(this.brandEmail);
    this.campaigns = this.brandService.myCampaigns;
  }

  onAcceptCreator(
    userId: string,
    campaignId: string,
    submissionId: string,
    userEmail: string,
    campaign: Campaign,
    i
  ) {
    this.clickedIndex = i;
    this.clicked = true;

    const status = { status: "accepted" };
    // add status to campaigns db
    this.http
      .post<{ name: string }>(
        "https://project-b7a57.firebaseio.com/campaigns/" +
          campaignId +
          "/submissions/" +
          submissionId +
          "/status.json",
        JSON.stringify(status)
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });

    this.getTokenForAcceptedUser(userId);

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "deni.azap11@gmail.com",
      Password: "1F605CF1AE0BDD8AF31AD43A8964039AD084",
      To: userEmail,
      From: "deni.azap11@gmail.com",
      Subject: "Congrats! Your submission was accepted!",
      Body: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <style type="text/css">body, html {
      margin: 0px;
      padding: 0px;
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      width: 100% !important;
    }
      table td, table {
      }
      #outlook a {
        padding: 0px;
      }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      @media only screen and (max-width: 480px) {
        table, table tr td, table td {
          width: 100% !important;
        }
        img {
          width: inherit;
        }
        .layer_2 {
          max-width: 100% !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
        .edsocialfollowcontainer table {
          max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
          padding: 10px !important;
        }
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
  </head>
  <body style="padding: 0px; margin: 0px;">
    <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
      <tbody>
        <tr>
          <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
              <tbody>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 0px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p style="text-align: right; font-size: 9px; margin: 0px; padding: 0px;"> Unable to view? Read it 
                                <a href="{view}" style="color: #5457ff; text-decoration: none;">online</a> 
                                <a href="{view}" style="color: #5457ff; text-decoration: none;"></a></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td class="edimg" valign="top" style="padding: 0px; box-sizing: border-box; text-align: center;">
                              <img style="border-width: 0px; border-style: none; max-width: 596px; width: 100%;" width="596" alt="Image" src="https://api.elasticemail.com/userfile/276847c6-5e9a-4c5a-aeed-a33a84944239/email.png">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style1 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                <span style="color: #6b7a8f;">Congrats</span>
                                <span style="color: #6b7a8f;">!</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                                <span style="font-size: 16px;">One of your submissions has just been accepted, please check your creator dashboard to find out more!</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edbutton" style="padding: 20px;">
                              <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                <tbody>
                                  <tr>
                                    <td align="center" style="border-radius: 2px; padding: 12px; background: #6b7a8f;">
                                      <a href="http://localhost:4200/login" target="_blank" style="color: #dcc7aa; font-family: Geneva, sans-serif; font-weight: bold; font-size: 16px; text-decoration: none; display: inline-block;"><span style="color: #dcc7aa;">VISIT WEBSITE</span></a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 48px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                <span style="color: #6b7a8f;">Please keep an eye on your inbox.</span>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                                <span style="color: #6b7a8f;">The brand will shortly follow up with further details to keep the collaboration going.</span>
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                              </p>
                              <p style="margin: 0px; padding: 0px;">
                                <br>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 296px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edimg" style="padding: 20px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.elasticemail.com/userfile/276847c6-5e9a-4c5a-aeed-a33a84944239/person1.jpg" alt="Image" width="256" style="border-width: 0px; border-style: none; max-width: 256px; width: 100%;">
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style3 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                <b>
                                  <span style="color: #6b7a8f;">I'm Alexa.</span>
                                </b>
                              </p>
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                              </p>
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                                <span style="color: #6b7a8f;">"Thank you for choosing Marketings. We are here to help you every step of your career, please don't hesitate to contact us for any information."</span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="edbutton text-center" style="padding: 20px; text-align: center;">
                              <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                <tbody>
                                  <tr>
                                    <td align="center" class="text-center" style="border-radius: 8px; padding: 0px; background: #6b7a8f; text-align: center;">
                                      <a style="font-size: 14px; color: #ffffff; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-weight: normal; text-decoration: none; display: inline-block;"><span style="color: #ffffff;"></span></a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 296px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edimg" style="padding: 20px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.elasticemail.com/userfile/276847c6-5e9a-4c5a-aeed-a33a84944239/person2.jpg" alt="Image" width="256" style="border-width: 0px; border-style: none; max-width: 256px; width: 100%;">
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p class="style3 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                <b>
                                  <span style="color: #6b7a8f;">I'm Ezra.</span>
                                </b>
                              </p>
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                              </p>
                              <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                                <span style="color: #6b7a8f;">"Thank you for choosing Marketings. We are here to help you every step of your career, please don't hesitate to contact us for any information."</span>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" class="edbutton text-center" style="padding: 20px; text-align: center;">
                              <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                <tbody>
                                  <tr>
                                    <td align="center" class="text-center" style="border-radius: 8px; padding: 0px; background: #4b62a3; text-align: center;">
                                      <a style="font-size: 14px; color: #ffffff; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-weight: normal; text-decoration: none; display: inline-block;"><span style="color: #ffffff;"></span></a></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 10px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="edimg" style="padding: 0px; box-sizing: border-box; text-align: center;">
                              <img src="https://api.elasticemail.com/userfile/276847c6-5e9a-4c5a-aeed-a33a84944239/3.jpg" alt="Image" width="596" style="border-width: 0px; border-style: none; max-width: 596px; width: 100%;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                      <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                        <tbody>
                          <tr>
                            <td valign="top" class="emptycell" style="padding: 20px;">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td class="drow text-center" valign="top" align="center" style="background-color: #e4e6ec; text-align: center; box-sizing: border-box; font-size: 0px;">
                    <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    <div class="layer_2 text-center" style="max-width: 596px; text-align: center; display: inline-block; vertical-align: top; width: 100%;">
                      <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td class="edtext text-center" valign="top" style="padding: 10px; text-align: center; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                              <p style="font-size: 11px; margin: 0px; padding: 0px;">
                                <span style="color: #6b7a8f;">If you no longer wish to receive mail from us, you can&nbsp;
                                  <a href="{unsubscribe}" style="background-color: initial; color: #828282; font-family: Helvetica, Arial, sans-serif; text-decoration: none;"><span style="font-size: 11px;">unsubscribe</span></a> 
                                  <br></span>{accountaddress}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
    }).then((message) => {
      // alert(message);
    });

    // window.location.reload();
  }

  getTokenForAcceptedUser(userId) {
    this.http
      .get<{ [key: string]: any }>(
        "https://project-b7a57.firebaseio.com/push-notifications.json"
      )
      .pipe(
        map((responseData) => {
          const entryArray: any[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              entryArray.push({ ...responseData[key], id: key });
            }
          }
          return entryArray;
        })
      )
      .subscribe((entries) => {
        for (const i in entries) {
          let user = entries[i].user;
          console.log(user.id);
          if (user.id == userId) {
            console.log(entries[i].token);
            this.msgService.sendPushNotification(entries[i].token);
            break;
          }
        }
      });
  }
}
