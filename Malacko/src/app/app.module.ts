import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    ContactInformationComponent
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
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
