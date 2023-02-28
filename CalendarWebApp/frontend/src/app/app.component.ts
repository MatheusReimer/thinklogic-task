import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent implements OnInit {
    title = 'CalendarWebAPP Thinklogic';
    events : any 

    constructor(private http : HttpClient) {}

    ngOnInit(): void {
        this.http.get('https://localhost:5001/api/calendarevents/').subscribe({
            next: response => this.events = response,
            error: err => console.log(err),
            complete: () => console.log('completed')
        })
    }
}
