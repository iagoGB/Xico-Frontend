import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SusbcribeComponent } from './views/subscribe/susbcribe.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LoginComponent } from './views/login/login.component';
import { CustomBackgroundComponent } from './components/custom-background/custom-background.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { DragulaModule } from 'ng2-dragula';
import { ProjectComponent } from './views/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    SusbcribeComponent,
    DashboardComponent,
    NavbarComponent,
    ModalComponent,
    ProfileComponent,
    LoginComponent,
    CustomBackgroundComponent,
    ProjectListComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    SortableModule.forRoot(),
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
