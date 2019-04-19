import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ChartModule } from 'angular2-chartjs';
import { NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from 'src/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { ListChildComponent } from './child/list-child/list-child.component';
import { DataStorageService } from './shared/data-storage.service';
import { WeightForAgeComponent } from './charts/weight/weight.component';
import { HeightForAgeComponent } from './charts/height/height.component';
import { BmiForAgeComponent } from './charts/bmi/bmi.component';
import { UtilService } from './shared/util.service';
import { NgbDateFirestoreAdapter } from './shared/ngb-date-firestore-adapter.service';
import { ManageChildComponent } from './child/manage-child/manage-child.component';
import { EditChildComponent } from './child/edit-child/edit-child.component';

@NgModule({
  declarations: [
    AppComponent,
    WeightForAgeComponent,
    HeightForAgeComponent,
    BmiForAgeComponent,
    HomeComponent,
    HeaderComponent,
    DropdownDirective,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    ListChildComponent,
    ManageChildComponent,
    EditChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    AngularFireModule.initializeApp(environment.firebase, 'growth-child'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService, DataStorageService, UtilService, 
    { provide: NgbDateAdapter, useClass: NgbDateFirestoreAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { }
