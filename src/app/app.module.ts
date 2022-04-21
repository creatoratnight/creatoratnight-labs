import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { E001Component } from './experiments/e001/e001.component';
import { E002Component } from './experiments/e002/e002.component';
import { E003Component } from './experiments/e003/e003.component';
import { E004Component } from './experiments/e004/e004.component';
import { E005Component } from './experiments/e005/e005.component';
import { E006Component } from './experiments/e006/e006.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './experiments/e005/list-item/list-item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    E001Component,
    E002Component,
    E003Component,
    E004Component,
    E005Component,
    E006Component,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
