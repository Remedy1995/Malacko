import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl ,Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-tracking-order',
  templateUrl: './admin-create-tracking-order.component.html',
  styleUrls: ['./admin-create-tracking-order.component.scss']
})
export class AdminCreateTrackingOrderComponent implements OnInit {
  showspinner: boolean = false;
  showRoutespinner: boolean = false;
  notification: any;
  additional_information: boolean = false;
  constructor(private service: ApiServiceService,
    private spinner: NgxSpinnerService, private router: Router) {
  }
  ngOnInit(): void {
    this.additional_information = this.additional_information;
  }

  shippingInformation = new FormGroup({
    destination: new FormControl('jdigf', Validators.required),
    ItemName: new FormControl('sjdfis', Validators.required),
    email: new FormControl('amia@gmail.com', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    itemsDescription: new FormControl(''),
    country: new FormControl('ojdgf', Validators.required),
    information: new FormControl('joj', Validators.required),
    remarks: new FormControl('ojj'),
    quantity: new FormControl('jo'),
    trackingstatus: new FormControl('', Validators.required),
    date: new FormControl('jo'),
    order_date: new FormControl('jo'),
    ShipperName: new FormControl('jo', Validators.required),
    ShipperAddress: new FormControl('jo', Validators.required),
    ShipperPhone: new FormControl('jo', Validators.required),
    RecieverName: new FormControl('jo', Validators.required),
    ReceiverAddress: new FormControl('jo', Validators.required),
    ReceiverPhone: new FormControl('joj', Validators.required),

  })

  toggleInformation() {
    this.additional_information = !this.additional_information;
  }

  submit() {
    if (this.shippingInformation.valid) {
      console.log(this.shippingInformation.value)
      this.showspinner = true;
      this.service.createShipping(this.shippingInformation.value).subscribe({


        next: (data) => {
          //set our notification
          this.notification = data.message;
          if (data) {
            setTimeout(() => {
              this.showspinner = false;
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: this.notification,
                showConfirmButton: true
              }),
                //let reset our form
                this.additional_information = !this.additional_information;
              this.shippingInformation.reset()
            }, 10000)

          }
        },
        error: (error) => {
          console.log(error.statusText)
          if (error.statusText === "Unknown Error") {
            this.notification = "Sorry an error occured please try again";
            setTimeout(() => {
              this.showspinner = false;
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: this.notification,
                showConfirmButton: true
              }),
                this.shippingInformation.reset();
              this.additional_information = !this.additional_information;
            }, 1000)

          }

        },
        complete: () => {
          console.log("shipping has been booked")
        }
      })
    }

    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Incorrect email provided or fields cannot be empty',
        showConfirmButton: true
      })
    }

  }


  Update() {
    this.showRoutespinner = true;
    setTimeout(() => {
      this.showRoutespinner = false;
      this.router.navigate(['update-tracking']);
    }, 3000)

  }


}
