import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import {ActivatedRoute} from '@angular/router';
import {AirportsService} from '../../services/airports.service';
import {Subscription} from 'rxjs';
import {FavoritesService} from '../../services/favorites.service';

@Component({
    selector: 'app-single-airport',
    templateUrl: './single-airport.component.html',
    styleUrls: ['./single-airport.component.css']
})

export class SingleAirportComponent implements OnInit, OnDestroy {
    airportICAO: string;
    airportSubscription: Subscription;
    airport: any = [];
    firstLoad = false;

    constructor(private mapService: MapService,
                private route: ActivatedRoute,
                private airportsService: AirportsService,
                private favoritesService: FavoritesService) { }

    ngOnInit() {
        this.airportICAO = this.route.snapshot.params.icao;
        this.airportsService.getAirportDetails(this.airportICAO);
        this.airportSubscription = this.airportsService.airportDetailsSubject.subscribe(
            (airport: any) => {
                this.airport = airport[0];
                if (!this.firstLoad) {
                    this.mapService.loadStaticMap([this.airport.lon, this.airport.lat], 10);
                    this.firstLoad = true;
                } else {
                    this.mapService.changeMapCenter([this.airport.lon, this.airport.lat]);
                }
            }
        );
    }

    onReload(event) {
        this.airportICAO = event;
        this.airportsService.getAirportDetails(this.airportICAO);
    }

    onSave() {
        this.favoritesService.addFavorite(this.airportICAO);
    }

    onDelete() {
        this.favoritesService.removeFavorite(this.airportICAO);
    }

    inFavorite() {
        return this.favoritesService.checkFavorite(this.airportICAO);
    }

    ngOnDestroy() {
        this.airportSubscription.unsubscribe();
    }
}
