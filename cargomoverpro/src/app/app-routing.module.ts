import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CreateShippingComponent } from './create-shipping/create-shipping.component';
import { EmailComponent } from './email/email.component';
import { FinalMapComponent } from './final-map/final-map.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ServicesComponent } from './services/services.component';
import { UpdateTrackingComponent } from './update-tracking/update-tracking.component';
import { ViewmapComponent } from './viewmap/viewmap.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminCreateTrackingOrderComponent } from './admin-create-tracking-order/admin-create-tracking-order.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AdminUpdateTrackingComponent } from './admin-update-tracking/admin-update-tracking.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'create-shipping',component:CreateShippingComponent},
  {path:'create-map',component:MapComponent},
  {path:'view-map',component:ViewmapComponent},
  {path:'final-map',component:FinalMapComponent},
  {path:'email',component:EmailComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'services',component:ServicesComponent},
  {path:'update-tracking',component:UpdateTrackingComponent},
  {path:'dashboard',component : DashboardComponent},
  {path:'create-admin-tracking-order',component :AdminCreateTrackingOrderComponent},
  {path:'update-admin-tracking-order',component :AdminUpdateTrackingComponent},
  {path : 'create-subscription',component : CreateSubscriptionComponent},
  {path:'auth-login',component : AuthLoginComponent},
  {path : 'auth-signup',component : SignupComponent},
  {path :'account-profile',component : AccountProfileComponent}
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
