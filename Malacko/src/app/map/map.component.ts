import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import {FormControl,FormGroup, Validators}  from '@angular/forms';
import {latLng, MapOptions, tileLayer, Map, Marker, icon, map} from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
   mapOptions!:MapOptions;
   country:any;
   getlatitude:any;
   getlongitude:any;
   map!:Map;
  constructor(private service:ApiServiceService,private cookie:CookieService) { }
  ngOnInit(): void {
    console.log('hello',this.mapdata.value.geolocation)
      this.service.getGeocoding().subscribe(geocode=>{
      console.log(geocode)
        });
        //initialise our map  
        console.log(this.cookie.get('latitude'));
        console.log(this.cookie.get('longitude'));
        console.log(this.cookie.get('country'));
        this.initializeMapOptions()
   
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


      mapdata=new FormGroup({
      geolocation:new FormControl('',Validators.required)});

      submit(){

        if(this.mapdata.valid){
       this.service.postData(this.mapdata.value).subscribe(data=>{
        console.log(data)
         this.country=data.location;
         this.getlatitude=data.message.lat;
         this.getlongitude=data.message.lng;
        //let set our location and the cordinates inside our cookie 
        this.cookie.set('country',this.country);
        this.cookie.set('latitude',this.getlatitude);
        this.cookie.set('longitude',this.getlongitude)
        console.log("==========================")
      })
       
      }

    }
}
