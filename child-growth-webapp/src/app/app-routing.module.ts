import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from 'src/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListChildComponent } from './child/list-child/list-child.component';
import { AddChildComponent } from './child/add-child/add-child.component';
import { BmiForAgeComponent } from './charts/bmi/bmi.component';
import { WeightForAgeComponent } from './charts/weight/weight.component';
import { HeightForAgeComponent } from './charts/height/height.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'signIn', component: SigninComponent},
  {path: 'childs', 
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard], 
    component: ListChildComponent, 
    children: [
      {path: '/:id/bmisForAge', component: BmiForAgeComponent},
      {path: '/:id/weightsForAge', component: WeightForAgeComponent},
      {path: '/:id/heightsForAge', component: HeightForAgeComponent},
    ]},
  {path: 'add-child', canActivate: [AuthGuard], component: AddChildComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

