import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SusbcribeComponent } from './views/subscribe/susbcribe.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './views/login/login.component';
import { ProjectComponent } from './views/project/project.component';
import { ProjectDetailsComponent } from './views/project-details/project-details.component';
import { ProfileEditComponent } from './views/profile-edit/profile-edit.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full'}, 
  { path: 'order-by/:filter', component: DashboardComponent },
  { path: 'tag/:tag', component: DashboardComponent },
  { path: 'inscreva-se', component: SusbcribeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil/:id', component: ProfileComponent },
  { path: 'editar-perfil/:id', component: ProfileEditComponent },
  { path: 'novo-projeto', component: ProjectComponent },
  { path: 'editar-projeto/:id', component: ProjectComponent },
  { path: 'portfolio/:id', component: ProjectDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
