import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  date:any=String;
  current:any=String;
  ngOnInit(): void {
  this.date=new Date();
  this.current=this.date.getFullYear();
  }




}
