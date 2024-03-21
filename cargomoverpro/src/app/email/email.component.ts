import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  constructor(private formbuilder:FormBuilder) { }
  emailForm=this.formbuilder.group({
    user_name:'',
    message:''
  })
  ngOnInit(): void {
  }
  
  public sendEmail(e: Event) {
    console.log(e.target)
    e.preventDefault();
    emailjs.sendForm('service_8k552fm', 'template_u7s19q9', e.target as HTMLFormElement, 'vAQPPTmzN9Cr-pJBz')
      .then((result: EmailJSResponseStatus) => {
        console.log(result);
      }, (error) => {
        console.log(error.text);
      });
  }
}
