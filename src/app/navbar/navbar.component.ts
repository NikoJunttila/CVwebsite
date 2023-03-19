import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';


 import * as AOS  from 'aos';
import { timeout } from 'rxjs';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private afs:AngularFirestore) { }
  logout(): void {
    this.afAuth.signOut();
}
userProfImg : any = "" 

getUserProfImg(){
  return this.afAuth.authState.subscribe(user => {
         if (user) {
           const emailLower = user.email?.toLowerCase();
            const userFull = this.afs.collection('users').doc(emailLower).valueChanges();
           userFull.subscribe(
             (data :any) => {
               this.userProfImg = data.photoURL
             },
             error => {
               console.error(error);
             })
         }
     });
 }


   ngOnInit(): void {
     AOS.init()
      AOS.refresh(); 
    this.getUserProfImg()
  } 
}



