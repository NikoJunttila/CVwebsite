import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FirstComponent } from './first/first.component';

import { EngRoutingModule } from './eng-routing.module';
import { EngComponent } from './eng.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';
import { SecondComponent } from './second/second.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component'; 


@NgModule({
  declarations: [
    EngComponent,
    FirstComponent,
     ContactComponent,
    ResumeComponent,
    SecondComponent,
    SidenavComponent,
    FooterComponent,
    SkillsComponent  
  ],
  imports: [
    CommonModule,
    EngRoutingModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EngModule { }
