import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';

const routes: Routes = [
  { path: '',  component:HomeComponent },
  { path: 'register',  component:FormComponent },
  { path: 'calendar',  component:CalendarComponent },
  { path: 'calendar/:id',  component:CalendarEditComponent },
  { path: '**',  component:HomeComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
