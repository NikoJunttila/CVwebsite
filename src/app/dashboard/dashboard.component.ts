import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore,private authser:AuthService) {
      this.user = null as any;
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
          console.log('Dashboard: user', user);

          if (user) {
              let emailLower = user.email?.toLowerCase();
              this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
          }
      });
  }

}
