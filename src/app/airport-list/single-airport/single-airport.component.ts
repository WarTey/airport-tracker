import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ActivatedRoute } from '@angular/router';
import { AirportsService } from '../../services/airports.service';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { LoadingService } from '../../services/loading.service';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-single-airport',
    templateUrl: './single-airport.component.html',
    styleUrls: ['./single-airport.component.css']
})

export class SingleAirportComponent implements OnInit, OnDestroy {
    airportICAO: string;
    airportSubscription: Subscription;
    isAuthSubscription: Subscription;
    airport: any = [];
    isAuth: boolean;
    loaded = false;

    // Constructeur de la classe
    constructor(private mapService: MapService,
                private route: ActivatedRoute,
                private airportsService: AirportsService,
                private favoritesService: FavoritesService,
                private loadingService: LoadingService,
                private toastr: ToastrService,
                private authService: AuthService) {
        this.loadingService.updateLoading(false);
    }

    ngOnInit() {
        this.authService.checkConnection();
        this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
            (auth: boolean) => {
                this.isAuth = auth;
            }
        );

        this.airportICAO = this.route.snapshot.params.icao;
        this.airportsService.getAirportDetails(this.airportICAO); // Permet de récupérer le détails d'un aéroport avec son icao
        this.mapService.loadStaticMap();
        this.airportSubscription = this.airportsService.airportDetailsSubject.subscribe(
            (airport: any) => {
                this.airport = airport[0];
                this.mapService.changeMapCenter([this.airport.lon, this.airport.lat]);
                if (!this.loaded) { // Si c'est la première fois que la page se charge alors on créé la map
                    this.mapService.createMarker([this.airport.lon, this.airport.lat]);
                    setTimeout(
                        () => {
                            this.loadingService.updateLoading(true);
                            this.loaded = true;
                        }, 1000
                    );
                } else { // Si la page à déja été chargé, alors on change les infos concernant le centre de la map et du marker (mise à jour de la page dynamiquement)
                    this.mapService.changeMarkerCenter([this.airport.lon, this.airport.lat]);
                }
            }
        );
    }

    // Quand on recharge la page
    onReload(event) {
        this.airportICAO = event;
        this.airportsService.getAirportDetails(this.airportICAO);
    }

    // Quand on veut mettre à jour la BDD de Firebase
    onSave() {
        this.favoritesService.addFavorite(this.airportICAO);
        this.toastr.toastrSuccess('Favoris', this.airport.name + ' ajouté aux favoris.');
    }

    // Quand on supprime un aéroport de nos favoris
    onDelete() {
        this.favoritesService.removeFavorite(this.airportICAO);
        this.toastr.toastrError('Favoris', this.airport.name + ' retiré des favoris.');
    }

    // Quand on veut savoir si l'aéroport est dans les favoris
    inFavorite() {
        return this.favoritesService.checkFavorite(this.airportICAO);
    }

    // Quand on détruit les abonnements
    ngOnDestroy() {
        this.airportSubscription.unsubscribe();
        this.isAuthSubscription.unsubscribe();
    }
}
