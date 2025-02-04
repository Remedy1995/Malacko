import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup,Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


 showspinner: boolean = false;
   showRoutespinner: boolean = false;
   showErrorMesssage : boolean = false;
   showSuccessMessage : boolean = false;
   notification: any;
   additional_information: boolean = false;
   constructor(private service: ApiServiceService,
     private spinner: NgxSpinnerService, private router: Router) {
   }
   ngOnInit(): void {
     this.additional_information = this.additional_information;
   }

   authenticationForm = new FormGroup({
     email: new FormControl('', [Validators.required,
     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      firstname : new FormControl('',Validators.required),
      lastname : new  FormControl('',Validators.required),
      phone : new FormControl('',Validators.required),
      password: new FormControl(''),
   })

   submit() {

     if (this.authenticationForm.valid) {
      this.showSuccessMessage = false;
       this.showspinner = true;
       this.showErrorMesssage = false;
       this.service.signUp(this.authenticationForm.value).subscribe({
         next: (data) => {
           //set our notification
           this.showSuccessMessage = true;
           this.notification = data.message + ".Proceed to login";

           if (data) {
               console.log('my data',data)
               this.showspinner = false;

           }
         },
         error: (error) => {
           console.log(error)
           if (error.status ===422) {
               this.showErrorMesssage = true;
             this.notification = error.error.message;

               this.showspinner = false;

             }
             else {
               this.showErrorMesssage =true;
               this.notification = "Sorry an error occured.Please try again later";
               this.showspinner = false;
             }
         },
         complete: () => {

         }
       })
     }

     else {
         this.showErrorMesssage = true;
         this.notification = "Sorry check your inputs and try again";
     }
    }
}
