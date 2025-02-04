import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CreateShippingComponent } from './create-shipping/create-shipping.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewmapComponent } from './viewmap/viewmap.component';
import { FinalMapComponent } from './final-map/final-map.component';
import { EmailComponent } from './email/email.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { UpdateTrackingComponent } from './update-tracking/update-tracking.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { ContactNumberComponent } from './contact-number/contact-number.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHeaderComponent } from './partials/dashboard-header/dashboard-header.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { AdminCreateTrackingOrderComponent } from './admin-create-tracking-order/admin-create-tracking-order.component';
import { DashboardFooterComponent } from './partials/dashboard-footer/dashboard-footer.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { SignupComponent } from './signup/signup.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AccountProfileComponent } from './account-profile/account-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    ContactUsComponent,
    CreateShippingComponent,
    SpinnerComponent,
    ViewmapComponent,
    FinalMapComponent,
    EmailComponent,
    AboutUsComponent,
    ServicesComponent,
    HeaderComponent,
    FooterComponent,
    UpdateTrackingComponent,
    ContactInformationComponent,
    ContactNumberComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SidebarComponent,
    AdminCreateTrackingOrderComponent,
    DashboardFooterComponent,
    CreateSubscriptionComponent,
    AuthLoginComponent,
    SignupComponent,
    AccountProfileComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
   BrowserAnimationsModule,




  ],

  providers: [
    CookieService,
    DatePipe,
    TitleCasePipe,
    {provide :HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
