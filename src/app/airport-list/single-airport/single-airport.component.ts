import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-single-airport',
    templateUrl: './single-airport.component.html',
    styleUrls: ['./single-airport.component.css']
})

export class SingleAirportComponent implements OnInit {
    airportName: string;
    airportICAO: string;

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.mapService.loadStaticMap([73.8567, 18.5204], 8);
        this.airportName = 'Airport Name';
        this.airportICAO = 'EDDF';
    }
}
