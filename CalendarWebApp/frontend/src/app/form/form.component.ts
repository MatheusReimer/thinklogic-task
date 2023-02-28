import {Component, OnInit} from '@angular/core';
import {EventService} from '../_services/event.service';
import { Router } from '@angular/router';

@Component({selector: 'app-form', templateUrl: './form.component.html', styleUrls: ['./form.component.css']})
export class FormComponent implements OnInit {
    model : any = {}

    constructor(private eventService : EventService, private router: Router) {}

    ngOnInit(): void {}

    register() {
        this.eventService.register(this.model).subscribe({
            next: response => console.log(response),
            error: err => console.log(err),
            complete: () => this.router.navigate(['/'])
        })
    }
}
