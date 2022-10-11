import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import Swal from 'sweetalert2';
import {latLng, MapOptions, tileLayer, Map, Marker, icon, } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  getlocation:any;
  getdescription:any;
  mapOptions!:MapOptions;
  country:any;
  getlatitude:any;
  getlongitude:any;
  map!:Map;
  showSpinner:boolean=false;
  contactInformation=new FormGroup(
  {
    fullname:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    message:new FormControl('',Validators.required)
  })

 constructor(private service:ApiServiceService,private cookie:CookieService) { }
 ngOnInit(): void {
     this.service.getGeocoding().subscribe(geocode=>{
        return geocode;
       });
       this.initializeMapOptions()
 }
 private initializeMapOptions() {
   this.mapOptions = {
     center: latLng(35.095192,33.203430),
     zoom: 4,
     layers: [
       tileLayer(
         'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         {
           maxZoom: 4,
           attribution: 'Map data © OpenStreetMap contributors'
         })
     ],
   };
 }

   onMapReady(map: Map) {
   this.map = map;
   this.addSampleMarker();
   }


   private addSampleMarker() {
     const marker = new Marker([35.095192,33.203430])
       .setIcon(
         icon({
           iconSize: [25, 41],
           iconAnchor: [13, 41],
           iconUrl: 'assets/marker-icon.png'
         }));
     marker.addTo(this.map);
   }

   //submit to the email address
   submit(){
    if(this.contactInformation.valid){
      this.showSpinner=true;
      this.service.contactEmail(this.contactInformation.value).subscribe(data=>{
       if(data===400){
        setTimeout(()=>{
         this.showSpinner=false;
         this.contactInformation.reset()
         Swal.fire({  
          position: 'top-end',  
          icon: 'error',  
          title:'Your email address is incorrect please try again' ,  
          showConfirmButton: true 
        })
        },3000)
       }else if(data==='We have  recieved your message and we will get back to you shortly')
       {
        setTimeout(()=>{
          this.showSpinner=false;
          this.contactInformation.reset()
          Swal.fire({  
           position: 'top-end',  
           icon: 'success',  
           title:'"We have  recieved your message and we will get back to you shortly' ,  
           showConfirmButton: true 
         })
         },3000)
       }
       else{
        setTimeout(()=>{
          this.showSpinner=false;
          this.contactInformation.reset()//reset form
          Swal.fire({  
           position: 'top-end',  
           icon: 'success',  
           title:'Internal Server Error',  
           showConfirmButton: true 
         })
         },3000)
       }
      })
   
    }
    else{
      Swal.fire({  
       position: 'top-end',  
       icon: 'error',  
       title:'All fields are required',  
       showConfirmButton: true 
     })
    }


}
}

