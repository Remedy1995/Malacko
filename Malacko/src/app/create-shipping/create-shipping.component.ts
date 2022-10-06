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
   this.service.createShipping(this.shippingInformation.value).subscribe(shipping=>{
    this.notification=shipping.message;
    console.log(shipping)
    if(shipping){
      this.shippingInformation.reset()
      setTimeout(()=>{
        this.showspinner = false;
        Swal.fire({  
          position: 'top-end',  
          icon: 'success',  
          title: this.notification,  
          showConfirmButton: true 
        }) 
      },10000)
     
    }
  
   })
  }
  else{
    console.log('no data input')
  }

}

}