import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-shipping',
  templateUrl: './create-shipping.component.html',
  styleUrls: ['./create-shipping.component.scss']
})
export class CreateShippingComponent implements OnInit {
  typeSelected: string;
  showspinner:boolean=false;

  notification:any;
  constructor(private service:ApiServiceService,private spinner: NgxSpinnerService) {
  this.typeSelected='ball-fusion';
   }
  ngOnInit(): void {
   
  
  }
  //show spinner when you click on create button
shippingInformation=new FormGroup({
  country:new FormControl('',Validators.required),
  // country_latitude:new FormControl('',Validators.required),
  // country_longitude:new FormControl('',Validators.required),
  ItemName:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  days:new FormControl('',Validators.required),
  itemsDescription:new FormControl('',Validators.required)
})


submit(){
  if(this.shippingInformation.valid){
   this.showspinner = true;
   this.service.createShipping(this.shippingInformation.value).subscribe({
     next:(data)=>{
       //set our notification 
       this.notification=data.message;
      if(data){
      setTimeout(()=>{
        this.showspinner = false;
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: this.notification,  
          showConfirmButton: true 
        }) ,
        //let reset our form
        this.shippingInformation.reset()
      },10000)
     
    }
  },
  error:(error)=>{
    if(error.statusText==="Unknown Error"){
      this.notification="Sorry an error occured please try again";
      setTimeout(()=>{
        this.showspinner=false;
        Swal.fire({  
          position: 'top-end',  
          icon: 'error',  
          title: this.notification,  
          showConfirmButton: true 
        }),
        this.shippingInformation.reset();
      },5000)
     
    }
  
  },
  complete:()=>{
  console.log("shipping has been booked")}
  })
  }
  
  else{
    console.log('no data input')
  }

}

}