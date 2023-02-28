import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  register(model:any){
    return this.http.post(this.baseUrl + 'calendarevents/register', model)
  }
  getEvents(){
    return this.http.get(this.baseUrl + 'calendarevents/')
  }
  getEventsByID(id:number){
    return this.http.get(this.baseUrl + 'calendarevents/' + id)
  }
  updateEvent(model:any){
    return this.http.put(this.baseUrl + 'calendarevents/update', model)
  }
  deleteEvent(id:number){
    return this.http.delete(this.baseUrl + 'calendarevents/' + id)
  }
  getEventsByMonth(month:string,year:string){
    return this.http.get(this.baseUrl + 'calendarevents/month/' + month + '/' + year )
  }
  getEventByDay(day:string,month:string,year:string){
    return this.http.get(this.baseUrl + 'calendarevents/day/' + day + '/' + month + '/' + year )
  }
  
}
