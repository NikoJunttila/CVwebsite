import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SecondComponent } from './main/second/second.component';
import { FirstComponent } from './main/first/first.component';
import { SkillsComponent } from './main/skills/skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResumeComponent } from './main/resume/resume.component';
import { FooterComponent } from './main/footer/footer.component';
import { ContactComponent } from './main/contact/contact.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './main/sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';



import { environment } from 'src/environments/environment';

import {AngularFireModule} from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';



import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LostpassComponent } from './lostpass/lostpass.component'




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SecondComponent,
    FirstComponent,
    SkillsComponent,
    ResumeComponent,
    FooterComponent,
    ContactComponent,
    SidenavComponent,
    NavbarComponent,
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    LostpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
