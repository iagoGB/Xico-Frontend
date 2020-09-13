import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SusbcribeComponent } from './views/subscribe/susbcribe.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './views/login/login.component';
import { ProjectComponent } from './views/project/project.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path:'inscreva-se', component: SusbcribeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'portfolio/:id', component: ProfileComponent },
  { path: 'projeto', component: ProjectComponent },
  { path: 'projeto/:id', component: ProjectComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
