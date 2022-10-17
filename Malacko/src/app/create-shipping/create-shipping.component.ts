import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-shipping',
  templateUrl: './create-shipping.component.html',
  styleUrls: ['./create-shipping.component.scss']
})
export class CreateShippingComponent implements OnInit {
  showspinner:boolean=false;
  showRoutespinner:boolean=false;
  notification:any;
  additional_information:boolean=false;
  constructor(private service:ApiServiceService,private spinner: NgxSpinnerService,private router:Router) {
   }
  ngOnInit(): void {
    this.additional_information=this.additional_information;
  }

shippingInformation=new FormGroup({
  destination:new FormControl('',Validators.required),
  ItemName:new FormControl('',Validators.required),
  email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  itemsDescription:new FormControl(''),
  country:new FormControl('',Validators.required),
  information:new FormControl('',Validators.required),
  remarks:new FormControl(''),
  quantity:new FormControl(''),
  trackingstatus:new FormControl('',Validators.required),
  date:new FormControl(''),
})
 
toggleInformation(){
 this.additional_information=!this.additional_information;
}

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
        this.additional_information=!this.additional_information;
        this.shippingInformation.reset()
      },10000)
     
    }
  },
  error:(error)=>{
    console.log(error.statusText)
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
        this.additional_information=!this.additional_information;
      },1000)
     
    }
  
  },
  complete:()=>{
  console.log("shipping has been booked")}
  })
  }
  
  else{
    Swal.fire({  
      position: 'top-end',  
      icon: 'error',  
      title:'Incorrect email provided or fields cannot be empty',  
      showConfirmButton: true 
    })
  }

}


 Update(){
  this.showRoutespinner=true;
   setTimeout(()=>{
   this.showRoutespinner=false;
    this.router.navigate(['update-tracking']);
   },3000)

 }


}
