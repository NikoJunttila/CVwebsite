import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
  }
canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {
        this.afAuth.authState.subscribe((user: any) => {
            if (user) {
              let emailLower = user.email?.toLowerCase();
             const  userAdmin = this.firestore.collection('users').doc(emailLower).valueChanges()
             userAdmin.subscribe((admin:any) => {
              console.log(admin)
              if(admin.accountType == "admin"){
                resolve(true)
              }else{  
                console.log('Auth Guard: user is not admin');
              this.router.navigate(['/gym']); 
                resolve(false)
              }
           })
            } 
        });
    });
} 

  
}
