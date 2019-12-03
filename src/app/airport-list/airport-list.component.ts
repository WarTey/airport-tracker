import {Component, OnDestroy, OnInit} from '@angular/core';
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

export class AirportListComponent implements OnInit, OnDestroy {
    airportsSubscription: Subscription;
    loaded = false;

    // Constructeur de la classe
    constructor(private http: HttpClient,
                private airportsService: AirportsService,
                private loadingService: LoadingService,
                private leafletService: LeafletService) {
        this.loadingService.updateLoading(false);
    }

    ngOnInit() {
        // Permet d'initialiser la map avec leaflet
        this.leafletService.loadDynamicMap();
        // Permet de remplir le tableau avec les infos issue de l'api
        this.airportsService.getAirports();

        // Création d'un sujet
        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any[]) => {
                for (const element of airports) {
                    this.leafletService.addIcon(
                        [element.lat, element.lon],
                        element.name,
                        element.city,
                        element.state,
                        element.country,
                        element.icao);
                }
                setTimeout(
                    () => {
                        this.loadingService.updateLoading(true);
                        this.loaded = true;
                    }, 1000
                );
            }
        );
    }

    ngOnDestroy() {
        this.airportsSubscription.unsubscribe();
    }
}
