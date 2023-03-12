import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  form! : FormGroup

  ngOnInit(): void {
    this.buildForm();
  }
  constructor(private formBuilder: FormBuilder) {}

  send(): void {
    const { name, email, message } = this.form.value;
    alert(`Name: ${name}, Email: ${email}, Message: ${message} `);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      message: this.formBuilder.control(null),
    });
  }
  public sendEmail(e: Event) {
    emailjs.sendForm('service_e1fziis', 'template_3h278tv', e.target as HTMLFormElement, 'XHLXO58fT4BwdYIYo')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert("thank you for message i will try to answer as soon as possible")
        this.form.reset();
      }, (error) => {
        console.log(error.text);
        alert(error.text)
      });
  }
}
