import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SusbcribeComponent } from './views/subscribe/susbcribe.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path:'inscreva-se', component: SusbcribeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'portfolio/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
