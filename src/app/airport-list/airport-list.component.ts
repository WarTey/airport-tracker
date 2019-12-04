import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AirportsService } from '../services/airports.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { LeafletService } from '../services/leaflet.service';

@Component({
    selector: 'app-airport-list',
    templateUrl: './airport-list.component.html',
    styleUrls: ['./airport-list.component.css']
})

export class AirportListComponent implements OnInit, OnDestroy {
    airportsSubscription: Subscription;
    airports: any = [];
    loaded = false;
    refreshMap = false;
    searchString: string;
    searchResults: string[] = [];

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
                this.airports = airports;
                this.AddMarkersToMap(airports);
                setTimeout(
                    () => {
                        this.loadingService.updateLoading(true);
                        this.loaded = true;
                    }, 1000
                );
            }
        );
    }

    // Fonction qui permet de gérer la barre de recherche
    onSearch() {
        let iteration = 0;
        // Permet de mettre un loader si le nombre de caractères tapé dans la requête comporte moins de 3 caractères
        if (this.searchString.length < 3) {
            this.refreshMap = true;
        }
        this.searchResults = [];
        this.leafletService.clearIcon();
        for (const element of this.airports) {
            if (this.searchString.length === 0) {
                this.searchResults = [];
                // Permet d'ajouter les markers à la map
                this.AddMarkersToMap(this.airports);
                break;
            } else if (element.name.toLowerCase().includes(this.searchString.toLowerCase())) {
                if (iteration < 6 && element.name.length !== this.searchString.length) {
                    this.searchResults.push(element.name);
                    iteration += 1;
                }
                this.leafletService.addIcon(
                    [element.lat, element.lon],
                    element.name,
                    element.city,
                    element.state,
                    element.country,
                    element.icao);
            }
        }
        setTimeout(
            () => {
                this.refreshMap = false;
            }, 1000
        );
    }
    // Permet de mettre à jour la barre de recherche lorsque l'on clic sur un résultat
    alertEvent(event) {
        this.searchString = event.target.innerHTML;
        this.onSearch();
    }

    // Permet d'ajouter les markers à la map
    AddMarkersToMap(airports: any) {
        for (const element of airports) {
            this.leafletService.addIcon(
                [element.lat, element.lon],
                element.name,
                element.city,
                element.state,
                element.country,
                element.icao);
        }
    }

    ngOnDestroy() {
        this.airportsSubscription.unsubscribe();
    }
}
