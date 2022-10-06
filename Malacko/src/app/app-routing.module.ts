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
import { ViewmapComponent } from './viewmap/viewmap.component';

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
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
