import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-viewmap',
  templateUrl: './viewmap.component.html',
  styleUrls: ['./viewmap.component.scss']
})
export class ViewmapComponent implements OnInit {
  showspinner:boolean=false;

  notification:any;
  constructor(private service:ApiServiceService,private cookie:CookieService,private router:Router) { }

  ngOnInit(): void {
  }
    consignmentInformation=new FormGroup({
    consignment_number:new FormControl('',Validators.required),
  })
  
  
  submit(){
    if(this.consignmentInformation.valid){
     this.showspinner = true;
     
     this.service.searchMap(this.consignmentInformation.value).subscribe({
     next:(data)=>{
      setTimeout(()=>{
        this.showspinner=false;
        this.router.navigate(['final-map']);
      },10000)
      //set results in cookie to display map
      this.cookie.set('latitude',data.message[0].country_latitude);
      this.cookie.set('longitude',data.message[0].country_longitude)
      this.cookie.set('country',data.message[0].country);
      this.cookie.set('description',data.message[0].itemsDescription)
     },
      error:(error)=>
      {this.notification=error.error.message,
        setTimeout(()=>{
          this.showspinner = false;
          Swal.fire({  
            position: 'top-end',  
            icon: 'success',  
            title: this.notification,  
            showConfirmButton: true 
          }) 
        },10000)
      },
     complete:()=>console.log("completed"),
     
     })
     this.consignmentInformation.reset()
    }
    else{
      console.log('no data input')
    }
  
  }
  public redirect(){
    
  }
}
