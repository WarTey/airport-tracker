import { Component, Input, OnInit } from '@angular/core';
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
    @Input() airportICAO: string;

    constructor(private flightsService: FlightsService) { }

    ngOnInit() {
        this.flightsService.getFlights(this.airportICAO);
        this.flightsSubscription = this.flightsService.flightsSubject.subscribe(
            (flights: any[]) => {
                this.flightList = flights;
            }
        );
    }
}
