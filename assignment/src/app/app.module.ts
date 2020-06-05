import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ReactiveFormsModule,FormBuilder, FormsModule } from '@angular/forms';
import {MatInputModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DatePipe } from '@angular/common';
import {FilterPipe} from '../app/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    CreateProjectComponent,
    FilterPipe
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
