import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BmiComponent } from './graphics/bmi/bmi.component';
import { HomeComponent } from './home/home.component';
import { WeightComponent } from './graphics/weight/weight.component';
import { HeightComponent } from './graphics/height/height.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from 'src/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListChildComponent } from './child/list-child/list-child.component';
import { AddChildComponent } from './child/add-child/add-child.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bmiGraph', canActivate: [AuthGuard] , component: BmiComponent},
  {path: 'weightGraph', canActivate: [AuthGuard], component: WeightComponent},
  {path: 'heightGraph', canActivate: [AuthGuard], component: HeightComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'signIn', component: SigninComponent},
  {path: 'child', component: ListChildComponent},
  {path: 'add-child', component: AddChildComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

