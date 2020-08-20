import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from '../signup/signup.component';
import { environment } from '../../environments/environment';
// Angular Firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    DashboardComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class HomeModule { }
