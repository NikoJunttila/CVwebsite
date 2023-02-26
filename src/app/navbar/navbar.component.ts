import { Component, OnInit } from '@angular/core';
import * as AOS  from 'aos';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    AOS.init()
      AOS.refresh();
  }
}



