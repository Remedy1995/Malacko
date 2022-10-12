import { Component, OnInit } from '@angular/core';
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
  carryMore:String | undefined;
  getdestination:any;
  ReadMoreInformation:number[]=[];
  trimfirstString:any;
  getdescription:any;
  mapOptions!:MapOptions;
  showReadMore:boolean=false;
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
       this.getdestination=this.cookie.get('destination');

       this.trimgetDescription();
 }
//trim our description
 trimgetDescription(){
  var data=[];
  //let split our text in an array of words
  var splitwords=this.getdescription.split(" ");
  //let check if the length of the array is greater than 30
   if(splitwords.length<=30){
   let reverse=splitwords.reverse();//reverse the string
   let joinstring=reverse.join(" ");//join the string back
   this.trimfirstString=joinstring;//set our text to our string;
  
   }
  else if(splitwords.length>30){
    //check the index of the array and slice the midpoint of the array
    let checkindex=splitwords.length-1;
    //let store our index
    this.ReadMoreInformation[1]=splitwords.length;
    let index=checkindex/2;//to get the mid of the array
    let slice_index=Math.floor(index);
     data.push(splitwords.splice(0,slice_index));//push the second part of the data into the array;
     
    //let save the index of the array in the read more information
    this.ReadMoreInformation[0]=slice_index;
     console.log(this.ReadMoreInformation);
     const reverseString= data[0].reverse();
    const joinString=reverseString.join(" ");
    this.trimfirstString=joinString;//display the first sliced string
    //show our readmore button
 
  }
 
  
   }

   //click to Read more 

   clickReadMore(event:Event){
    //let disable browser from refreshing when we click on link
    event.preventDefault();
    // we click more to display the rest of the description data;
   let getindex=this.ReadMoreInformation[0];//we get the index from the  trimgetDescription();
  //we  use the index to splice the end of the array
    let trimremainingtext=this.getdescription.split(" ");
    let data=[];
    //push our data trimremaining text to a new array;
    data.push(trimremainingtext);
    //let reverse our data;
    let reverse=data[0].reverse();
    //let trim our data 
    let arrayLength=this.ReadMoreInformation[1];
    let trim=reverse.splice(getindex+1,arrayLength);
  //let join our data back;
    let join=trim.join(" ");
    console.log(join);
    //asign our data to carry more variable to display in the front end;
    this.carryMore=join;
    //check our guards to display our data;
    if(this.showReadMore===false)
    {
      this.showReadMore=true;
    }else{
      this.showReadMore=false;
    }

   }
 private initializeMapOptions() {
      
   this.mapOptions = {

     center: latLng( parseFloat(this.cookie.get('latitude')) ,parseFloat(this.cookie.get('longitude'))),
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
  //  this.map.zoomControl.remove();
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