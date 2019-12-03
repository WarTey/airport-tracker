import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AirportsService} from '../services/airports.service';
import {Subscription} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {LeafletService} from '../services/leaflet.service';

@Component({
    selector: 'app-airport-list',
    templateUrl: './airport-list.component.html',
    styleUrls: ['./airport-list.component.css']
})

export class AirportListComponent implements OnInit {
    airportsSubscription: Subscription;
    loading = false;

    constructor(private http: HttpClient,
                private airportsService: AirportsService,
                private loadingService: LoadingService,
                private leafletService: LeafletService) { }

    ngOnInit() {
        this.leafletService.loadDynamicMap();
        this.airportsService.getAirports();
        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any[]) => {
                for (const element of airports) {
                    this.leafletService.addIcon(
                        [element.lat, element.lon],
                        element.name,
                        element.city,
                        element.state,
                        element.country);
                }
                setTimeout(
                    () => {
                        this.loadingService.updateLoading(true);
                        this.loading = true;
                    }, 1000
                );
            }
        );
    }
}
