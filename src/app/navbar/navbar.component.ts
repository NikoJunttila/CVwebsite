import { Component, OnInit } from '@angular/core';
import * as AOS  from 'aos';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) { }
  logout(): void {
    this.afAuth.signOut();
}



  ngOnInit(): void {
    AOS.init()
      AOS.refresh();
  }
}



