import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
}
