import {Component, OnInit} from '@angular/core';
import {EventService} from '../_services/event.service';

@Component({selector: 'app-calendar', templateUrl: './calendar.component.html', styleUrls: ['./calendar.component.css']})
export class CalendarComponent implements OnInit {
    events : any = {}
    constructor(private eventService : EventService) {}

    ngOnInit(): void {
        this.getEvents()
    }
    getEvents() {
        this.eventService.getEvents().subscribe({
            next: response => {
                this.events = response
                console.log(response)
            },
            error: err => console.log(err),
            complete: () => console.log('completed')
        })
    }
    deleteEvent(id : string) {
        this.eventService.deleteEvent(Number(id)).subscribe({
            next: response => {
                this.getEvents()
            },
            error: err => console.log(err),
            complete: () => console.log('completed')
        })
    }

}
