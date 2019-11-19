import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-flight-list',
    templateUrl: './flight-list.component.html',
    styleUrls: ['./flight-list.component.css']
})

export class FlightListComponent implements OnInit {
    flightsSubscription: Subscription;
    flightList: any[];

    constructor(private flightsService: FlightsService) {
        this.flightsService.getFlights('EDDF');
    }

    ngOnInit() {
        this.flightsSubscription = this.flightsService.flightsSubject.subscribe(
            (flights: any[]) => {
                this.flightList = flights;
                console.log(this.flightList);
            }
        );
    }
}
