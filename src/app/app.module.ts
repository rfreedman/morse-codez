import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import {SingleCharsComponent} from './single-chars/single-chars.component';
import {FormsModule} from '@angular/forms';

import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SingleCharsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/morse-player/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
