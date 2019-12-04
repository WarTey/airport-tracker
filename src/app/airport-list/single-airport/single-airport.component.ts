import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import {ActivatedRoute} from '@angular/router';
import {AirportsService} from '../../services/airports.service';
import {Subscription} from 'rxjs';
import {FavoritesService} from '../../services/favorites.service';
import {LoadingService} from '../../services/loading.service';
import {ToastrService} from '../../services/toastr.service';

@Component({
    selector: 'app-single-airport',
    templateUrl: './single-airport.component.html',
    styleUrls: ['./single-airport.component.css']
})

export class SingleAirportComponent implements OnInit, OnDestroy {
    airportICAO: string;
    airportSubscription: Subscription;
    airport: any = [];
    loaded = false;

    constructor(private mapService: MapService,
                private route: ActivatedRoute,
                private airportsService: AirportsService,
                private favoritesService: FavoritesService,
                private loadingService: LoadingService,
                private toastr: ToastrService) {
        this.loadingService.updateLoading(false);
    }

    ngOnInit() {
        this.airportICAO = this.route.snapshot.params.icao;
        this.airportsService.getAirportDetails(this.airportICAO);
        this.mapService.loadStaticMap();
        this.airportSubscription = this.airportsService.airportDetailsSubject.subscribe(
            (airport: any) => {
                this.airport = airport[0];
                this.mapService.changeMapCenter([this.airport.lon, this.airport.lat]);
                if (!this.loaded) {
                    this.mapService.createMarker([this.airport.lon, this.airport.lat]);
                    setTimeout(
                        () => {
                            this.loadingService.updateLoading(true);
                            this.loaded = true;
                        }, 1000
                    );
                } else {
                    this.mapService.changeMarkerCenter([this.airport.lon, this.airport.lat]);
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
        this.toastr.toastrSuccess('Favoris', this.airport.name + ' ajouté aux favoris.');
    }

    onDelete() {
        this.favoritesService.removeFavorite(this.airportICAO);
        this.toastr.toastrError('Favoris', this.airport.name + ' retiré des favoris.');
    }

    inFavorite() {
        return this.favoritesService.checkFavorite(this.airportICAO);
    }

    ngOnDestroy() {
        this.airportSubscription.unsubscribe();
    }
}
