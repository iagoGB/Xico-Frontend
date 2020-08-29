import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SusbcribeComponent } from './views/subscribe/susbcribe.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path:'inscreva-se', component: SusbcribeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
