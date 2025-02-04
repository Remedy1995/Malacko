import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';


@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  firstname : String | any;
  lastname :  String | undefined;
   phone :  String | undefined
   email :  String | undefined


  constructor(private service : ApiServiceService) {}



  ngOnInit(): void {
    this.getAuthenticatedUserData()
  }

  private getAuthenticatedUserData() {
      this.service.getUserInfo().subscribe((data)=> {
        const {message} = data;
        this.email = message.email;
        this.firstname = message.firstname;
        this.lastname = message.lastname;
        this.phone = message.phone;
      })
  }
}
