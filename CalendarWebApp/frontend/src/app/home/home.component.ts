import {Component, OnInit} from '@angular/core';
import {EventService} from '../_services/event.service';
import { Router } from '@angular/router';

@Component({selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
    events : any = {}
    eventsOfSelectedDay : any = {}
    numberOfDaysMonth : Array < Number > = []
    currentMonthLong : string = new Date().toLocaleString('default', {month: 'long'})
    currentMonth : number = new Date().getMonth()+1
    currentYear : string = new Date().getFullYear().toString()
    currentDay : number = new Date().getDate() - 1 
    isEditing : boolean = false
    
    constructor(private eventService : EventService,private router:Router) {}

    ngOnInit(): void {
        this.filterCalendarEvents()
        this.daysInMonth()
    }

    daysInMonth() {
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let numberofDays = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= numberofDays; i++) {
            this.numberOfDaysMonth.push(i)
        }
    }
    compareDays(index : number) {
        if (index == this.currentDay) {
            return true
        }
        return false
    }
    compareDaysOfEvents(index : number) {
        let numberOfEvents = 0
        for (let i = 0; i < this.events.length; i++) {
            let dayOfEvent = new Date(this.events[i].startDate).getDate()-1
            if (index == dayOfEvent) {
                numberOfEvents++
            }
        }
        return numberOfEvents
    }
    filterCalendarEvents() {
        var date = new Date();
        var month = date.getMonth() + 1;
        this.eventService.getEventsByMonth(month.toString(),this.currentYear).subscribe({
            next: response => {
                this.events = response
            },
            error: err => console.log(err),
            complete: () => console.log('completed')
        })
    }
    deleteEvent(id : number) {
        this.eventService.deleteEvent(id).subscribe({
            next: () => {
                this.filterCalendarEvents()
                this.isEditing=false
            },
            error: err => console.log(err),
            complete: () => this.router.navigate(['/'])
        })
    }
    editEvent(day:number) {
      this.isEditing=true
      this.getEventByDay(day)
    }
    cancelEdit(){
      this.isEditing=false
    }
    getEventByDay(day : number) {
      this.eventService.getEventByDay(day.toString(),this.currentMonth.toString(),this.currentYear).subscribe({
        next: response => {
          this.eventsOfSelectedDay = response
        },
        error: err => console.log(err),
        complete: () => console.log('completed')
      })
    }
}
