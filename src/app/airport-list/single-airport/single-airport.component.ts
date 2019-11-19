import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-single-airport',
    templateUrl: './single-airport.component.html',
    styleUrls: ['./single-airport.component.css']
})
export class SingleAirportComponent implements OnInit {
    airportName: string;
    airportICAO: string;

    constructor() { }

    ngOnInit() {
        this.airportName = 'Airport Name';
        this.airportICAO = 'EDDF';
    }
}
