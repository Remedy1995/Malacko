import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { latLng, MapOptions, tileLayer, Map, Marker, icon, map } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-final-map',
  templateUrl: './final-map.component.html',
  styleUrls: ['./final-map.component.scss']
})
export class FinalMapComponent implements OnInit {
  getlocation:any;
  getdescription:any;
  mapOptions!:MapOptions;
  country:any;
  getlatitude:any;
  getlongitude:any;
  map!:Map;
 constructor(private service:ApiServiceService,private cookie:CookieService) { }
 ngOnInit(): void {
   
     this.service.getGeocoding().subscribe(geocode=>{
     console.log(geocode)
       });
       //initialise our map  
       console.log(this.cookie.get('latitude'));
       console.log(this.cookie.get('longitude'));
       console.log(this.cookie.get('country'));
       this.initializeMapOptions()
       this.getlocation=this.cookie.get('country')
       this.getdescription=this.cookie.get('description');
 }
 private initializeMapOptions() {
      
   this.mapOptions = {

     center: latLng( parseFloat(this.cookie.get('latitude')) ,parseFloat(this.cookie.get('longitude'))),
     zoom: 6,
     layers: [
       tileLayer(
         'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         {
           maxZoom: 18,
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
     const marker = new Marker([parseFloat(this.cookie.get('latitude')),parseFloat(this.cookie.get('longitude'))])
       .setIcon(
         icon({
           iconSize: [25, 41],
           iconAnchor: [13, 41],
           iconUrl: 'assets/marker-icon.png'
         }));
     marker.addTo(this.map);
   }
}
