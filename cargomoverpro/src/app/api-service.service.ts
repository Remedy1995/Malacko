import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  env = environment.apiURL;//get our environment variables

  geturl = `${this.env}/geocode`;
  getdata = `${this.env}/mapping/mapping`;
  shippingorder = `${this.env}/shipping/createshipping`;
  consign = `${this.env}/shipping/consignment`;
  viewmap = `${this.env}/shipping/viewmap`;
  sendcontact = `${this.env}/contactUsEmail/contactUsEmail`;
  updatetrackcode = `${this.env}/shipping/updatetrackingstatus`;
  signinUser = `${this.env}/auth/login`;
  signUpUser = `${this.env}/auth/signup`;
  userInfo = `${this.env}/auth/user-info`;
  subscriptionInfo = `${this.env}/subscription/subscription`;

  constructor(private _http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this._http.post(`${this.getdata}`, data);
  }

   signIn(data : any):Observable<any> {
    console.log('data',data)
    return this._http.post(`${this.signinUser}`,data,{withCredentials : true})
   }

   signUp(data : any):Observable<any> {
    console.log('data',data)
    return this._http.post(`${this.signUpUser}`,data)
   }
  getGeocoding(): Observable<any> {
    return this._http.get(`${this.geturl}`);

  }

  getUserInfo() : Observable<any> {
    return this._http.get(`${this.userInfo}`,{withCredentials : true});
  }

  getAccountSubscriptionInfo() : Observable<any> {
    return this._http.get(`${this.subscriptionInfo}`,{withCredentials : true});
  }
  contactEmail(data: any): Observable<any> {
    return this._http.post(`${this.sendcontact}`, data,{withCredentials : true});
  }
  createShipping(data: any): Observable<any> {
    return this._http.post(`${this.shippingorder}`, data,{withCredentials : true})
  }
  updateTracking(data: any): Observable<any> {
    return this._http.post(`${this.updatetrackcode}`, data)
  }

  consignment(): Observable<any> {
    return this._http.get(`${this.consign}`);
  }

  searchMap(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${this.viewmap}`, data);
  }
}

