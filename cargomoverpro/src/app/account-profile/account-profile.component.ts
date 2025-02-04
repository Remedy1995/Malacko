import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

 firstname : String | any;
 lastname :  String | any;
 phone :  String | any;
 email :  String | any;
 subscriptionPlanName:String | undefined;
 description:String | undefined;
 subscriptionCredits: Number | undefined;
 priceOfSubscriptionPlan : Number | undefined;
 created_At: Date | undefined



  constructor(private service : ApiServiceService) {}



  ngOnInit(): void {
    this.getAccountInfoData()
  }

  private getAccountInfoData() {
      this.service.getAccountSubscriptionInfo().subscribe((data)=> {
        const {message} = data;
        console.log(message.subscriptionPlanName)
        this.email = message.user.email;
        this.firstname = message.user.firstname;
        this.lastname = message.user.lastname;
        this.created_At = message.created_At;
        this.description = message.description;
        this.phone = message.user.phone;
        this.priceOfSubscriptionPlan = message.priceOfSubscriptionPlan.toFixed(2);
        this.subscriptionCredits = message.subscriptionCredits;
        this.subscriptionPlanName = message.subscriptionPlanName;
      })
  }

}
