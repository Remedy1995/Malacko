import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay: boolean = false;
  toggleDisplay1: boolean = false;
  toggleDisplay2: boolean = false;
  toggleDisplay3: boolean = false;
  toggleDisplay4: boolean = false;

  seaReadMore(event: Event) {
    event.preventDefault();//prevent page from reloading
    if (this.toggleDisplay === false) {
      this.toggleDisplay = true;
    }
    else {
      this.toggleDisplay = false;
    }
  }
  logisticsReadMore(event: Event) {
    event.preventDefault();//prevent page from reloading
    if (this.toggleDisplay1 === false) {
      this.toggleDisplay1 = true;
    }
    else {
      this.toggleDisplay1 = false;
    }
  }
  customReadMore(event: Event) {
    event.preventDefault();//prevent page from reloading
    if (this.toggleDisplay2 === false) {
      this.toggleDisplay2 = true;
    }
    else {
      this.toggleDisplay2 = false;
    }
  }

  airReadMore(event: Event) {
    event.preventDefault();//prevent page from reloading
    if (this.toggleDisplay3 === false) {
      this.toggleDisplay3 = true;
    }
    else {
      this.toggleDisplay3 = false;
    }
  }
  landReadMore(event: Event) {
    event.preventDefault();//prevent page from reloading
    if (this.toggleDisplay4 === false) {
      this.toggleDisplay4 = true;
    }
    else {
      this.toggleDisplay4 = false;
    }
  }

}
