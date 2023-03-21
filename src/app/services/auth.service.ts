import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { MessageService } from './message.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

     userFull: Observable<any>; 
    
  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, private afAuth: AngularFireAuth,private afs: AngularFirestore,private location:Location,
        private messageService:MessageService) {
        this.userLoggedIn = false;
        this.userFull = null as any;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }



    loginUser(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.messageService.add("welcome back summoner", "success")
                this.location.back()
            })
            .catch(error => {
                console.log('Auth Service: login error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code)
                    return { isValid: false, message: error.message };
            });
    }


    googleLogin(){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
signInWithPopup(auth, provider)
  .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    let emailLower = user.email!.toLowerCase();
    const userRef : any = this.afs.doc('/users/' + emailLower)  
    this.afs.doc(`users/${emailLower}`).get().subscribe(docSnapshot => {
        if (docSnapshot.exists) {
          // Document exists, do something
          this.messageService.add('Welcome back',"success")
        } else {
            this.messageService.add('Hi :)',"success")
            const data = {
                accountType: 'normie',
                displayName: user?.displayName,
                email: user.email,
                email_lower: emailLower,
                photoURL: user.photoURL
            }
            userRef.set(data, {merge:true})
        }
      });
    this.location.back()
       // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    this.messageService.add(error,"error")

    console.log(error)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }


    signupUser(user: any): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                let emailLower = user.email.toLowerCase();

                this.afs.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
                    .set({
                        accountType: 'normie',
                        displayName: user.displayName,
                        displayName_lower: user.displayName.toLowerCase(),
                        email: user.email,
                        email_lower: emailLower,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/portfolio-5756d.appspot.com/o/uploads%2F1679212379254_1367902251612x612.jpg?alt=media&token=d8828d33-d1ad-45aa-bbf7-2063923e7f6c"
                    });
                    this.messageService.add("have fun time using this app","success")
                    result.user!.sendEmailVerification();                    // immediately send the user a verification email
            })
            .catch(error => {
                this.messageService.add('signup error',"error")

                console.log('Auth Service: signup error', error);
                if (error.code)
                    return { isValid: false, message: error.message };
            });
    }


    resetPassword(email: string): Promise<any> {
        return this.afAuth.sendPasswordResetEmail(email)
            .then(() => {
                console.log('Auth Service: reset password success');
                // this.router.navigate(['/amount']);
            })
            .catch(error => {
                console.log('Auth Service: reset password error...');
                console.log(error.code);
                console.log(error)
                if (error.code)
                    return error;
            });
    }

    async resendVerificationEmail() {                         // verification email is sent in the Sign Up function, but if you need to resend, call this function
        return (await this.afAuth.currentUser)?.sendEmailVerification()
            .then(() => {
                // this.router.navigate(['home']);
            })
            .catch(error => {
                console.log('Auth Service: sendVerificationEmail error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code)
                    return error;
            });
    }
    setUserInfo(payload: object) {
        console.log('Auth Service: saving user info...');
        this.afs.collection('users')
            .add(payload).then(function (res) {
                console.log("Auth Service: setUserInfo response...")
                console.log(res);
            })
    }

    getCurrentUser() {
        return this.afAuth.currentUser;                                 // returns user object for logged-in users, otherwise returns null 
    }



}
