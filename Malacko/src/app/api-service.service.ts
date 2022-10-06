import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  geturl="http://localhost:3000/geocode";
  getdata="http://127.0.0.1:3000/mapping/mapping";
  shippingorder="http://127.0.0.1:3000/shipping/createshipping";
  consign="http://127.0.0.1:3000/shipping/consignment";
  viewmap="http://127.0.0.1:3000/shipping/viewmap";
  constructor(private _http:HttpClient) { }
 
  postData(data:any):Observable<any>{
    console.log(data)
    console.log(this.getdata)
    return this._http.post(`${this.getdata}`,data);
   }
     
  getGeocoding():Observable<any>{
   return this._http.get(`${this.geturl}`);
  }

  createShipping(data:any):Observable<any>{
    return this._http.post(`${this.shippingorder}`,data)
  }

  consignment():Observable<any>{
    return this._http.get(`${this.consign}`);
  }

  searchMap(data:any):Observable<any>{
    console.log(data)
    return this._http.post(`${this.viewmap}`,data);
  }
}
