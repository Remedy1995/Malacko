import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-update-tracking',
  templateUrl: './update-tracking.component.html',
  styleUrls: ['./update-tracking.component.scss']
})
export class UpdateTrackingComponent implements OnInit {

  showspinner:boolean=false;
  showRoutespinner:boolean=false;
  notification:any;
  constructor(private service:ApiServiceService,private spinner: NgxSpinnerService,private router:Router) {
   }
  ngOnInit(): void {  
  
  }

    statusInformation=new FormGroup({
    consignment_code:new FormControl('',Validators.required),
    status_code:new FormControl('',Validators.required),
})


submit(){
  console.log(this.statusInformation.value)
  if(this.statusInformation.valid){

    console.log(this.statusInformation)
   this.showspinner = true;
   console.log(this.statusInformation)
   this.service.updateTracking(this.statusInformation.value).subscribe({
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
        this.statusInformation.reset()
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
        this.statusInformation.reset();
      },1000)
     
    }
  
  },
  complete:()=>{
  console.log("tracking status updated")}
  })
  }
  
  else{
    Swal.fire({  
      position: 'top-end',  
      icon: 'error',  
      title:'fields cannot be empty',  
      showConfirmButton: true 
    })
  }

}


}
