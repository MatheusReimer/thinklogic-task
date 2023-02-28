import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { FormComponent } from './form/form.component'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    CalendarComponent,
    CalendarEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
