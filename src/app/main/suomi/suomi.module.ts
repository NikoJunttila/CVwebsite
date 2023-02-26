import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { SuomiRoutingModule } from './suomi-routing.module';
import { SuomiComponent } from './suomi.component';
import { TokaComponent } from './toka/toka.component';
import { AnsioluetteloComponent } from './ansioluettelo/ansioluettelo.component';
import { TaidotComponent } from './taidot/taidot.component';
import { YhteysComponent } from './yhteys/yhteys.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EkaComponent } from './eka/eka.component';
import { SivunavComponent } from './sivunav/sivunav.component';
import { AlahommaComponent } from './alahomma/alahomma.component';

@NgModule({
  declarations: [
    SuomiComponent,
    EkaComponent,
    TokaComponent,
    AnsioluetteloComponent,
    TaidotComponent,
    YhteysComponent,
    SivunavComponent,
    AlahommaComponent,
  ],
  imports: [
    CommonModule,
    SuomiRoutingModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class SuomiModule { }
