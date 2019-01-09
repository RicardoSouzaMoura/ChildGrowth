import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ChartModule } from 'angular2-chartjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeightComponent } from './graphics/weight/weight.component';
import { HeightComponent } from './graphics/height/height.component';
import { BmiComponent } from './graphics/bmi/bmi.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from 'src/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { ListChildComponent } from './child/list-child/list-child.component';
import { AddChildComponent } from './child/add-child/add-child.component';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    WeightComponent,
    HeightComponent,
    BmiComponent,
    HomeComponent,
    HeaderComponent,
    DropdownDirective,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    ListChildComponent,
    AddChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    AngularFireModule.initializeApp(environment.firebase, 'growth-child'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
