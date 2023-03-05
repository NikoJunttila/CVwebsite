import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-yhteys',
  templateUrl: './yhteys.component.html',
  styleUrls: ['./yhteys.component.css']
})
export class YhteysComponent implements OnInit {
  form! : FormGroup

  ngOnInit(): void {
    this.buildForm();
  }
  constructor(private formBuilder: FormBuilder) {}

  public sendEmail(e: Event) {
    emailjs.sendForm('service_e1fziis', 'template_3h278tv', e.target as HTMLFormElement, 'XHLXO58fT4BwdYIYo')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert("kiitos viestistä. palaan asiaan heti kun voin")
        this.form.reset();
      }, (error) => {
        console.log(error.text);
        alert(error.text)
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      message: this.formBuilder.control(null),
    });
  }
}
