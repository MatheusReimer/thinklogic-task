import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {
  calendar:any = {}
  idFromUrl:Number = 0
  constructor(private eventService:EventService, private route:ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
    this.getCalendar();
  }
  
  updateCalendar(){
    if(this.calendar==null){
      return
    }
    this.eventService.updateEvent(this.calendar).subscribe({
      next: calendar => {
        this.calendar = calendar
      },
      error: err => console.log(err),
      complete: () => this.router.navigate(['/'])
    
    })

  }
  getIdFromURL()
  {
    return this.route.snapshot.paramMap.get('id');
  }

  getCalendar(){
    this.idFromUrl =Number(this.getIdFromURL())
    this.eventService.getEventsByID(Number(this.idFromUrl)).subscribe(
      {
        next: calendar => {
          this.calendar = calendar
        },
        error: err => console.log(err),
        complete: () => console.log('completed')
      })
    }
    
}
