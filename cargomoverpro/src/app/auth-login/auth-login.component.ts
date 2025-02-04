import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup,Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

showspinner: boolean = false;
  showRoutespinner: boolean = false;
  showErrorMesssage : boolean = false;
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
    password: new FormControl(''),
  })

  submit() {
    console.log('i clicked this')
    if (this.authenticationForm.valid) {
      this.showspinner = true;
      this.showErrorMesssage = false;
      this.service.signIn(this.authenticationForm.value).subscribe({
        next: (data) => {
          //set our notification
          this.notification = data.message;
          if (data) {
              console.log('my data',data)
              this.showspinner = false;
              this.router.navigate(['dashboard'])

          }
        },
        error: (error) => {
          console.log(error)
          if (error.status ===400) {
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


