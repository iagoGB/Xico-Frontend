import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProjectComponent } from './views/project/project.component';
import { ProjectDetailsComponent } from './views/project-details/project-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { LightboxModule } from 'ngx-lightbox';

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
    ProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    SortableModule.forRoot(),
    CarouselModule.forRoot(),
    DragulaModule.forRoot(),
    ToastrModule.forRoot(),
    LightboxModule
  ],
  exports:[
    NgxSpinnerModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
