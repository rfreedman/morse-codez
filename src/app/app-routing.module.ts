import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {SingleCharsComponent} from './single-chars/single-chars.component';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'single', component: SingleCharsComponent},
  { path: '**', component: LandingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
