import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { FavoritesService } from '../services/favorites.service';
import { AirportsService } from '../services/airports.service';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from '../services/toastr.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.component.html',
    styleUrls: ['./favorite-list.component.css']
})

export class FavoriteListComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = { };
    dtTrigger = new Subject();

    favoritesSubscription: Subscription;
    airportsSubscription: Subscription;
    favorites: Favorite[] = [];
    airports: any = [];
    tableLoaded = false;

    constructor(private favoritesService: FavoritesService,
                private airportsService: AirportsService,
                private loadingService: LoadingService,
                private toastr: ToastrService,
                private router: Router) {
        this.loadingService.updateLoading(true);
    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };

        // Charge la liste complète des favoris
        this.favoritesService.getFavorites();
        this.favoritesSubscription = this.favoritesService.favoritesSubject.subscribe(
            (favorites: Favorite[]) => {
                // Récupère seulement les favoris qui nous appartiennent
                this.favorites = favorites.filter(
                    favorite => this.favoritesService.checkFavorite(favorite.icao, favorite.id)
                );
                // Charge la liste complète des aéroports
                this.airportsService.getAirports();
            }
        );

        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any) => {
                // Récupère les aéroports qui sont dans nos favoris
                this.airports = airports.filter(
                    airport => {
                        for (const element of this.favorites) {
                            if (element.icao === airport.icao) {
                                return true;
                            }
                        }
                    }
                );
                // Charge le tableau au premier chargement du site
                if (!this.tableLoaded) {
                    this.dtTrigger.next();
                    this.tableLoaded = true;
                }
            }
        );
    }

    onReload(icao: string) {
        // Navigue vers une autre route (l'aéroport cliqué)
        this.router.navigate(['details/' + icao]);
    }

    onDelete(icao, name) {
        // Supprime un aéroport des favoris
        this.favoritesService.removeFavorite(icao);
        // Affiche un toastr d'erreur confirmant la suppression
        this.toastr.toastrError('Favoris', name + ' retiré des favoris.');
    }

    ngOnDestroy() {
        // Détruit les 'Subscription'
        this.airportsSubscription.unsubscribe();
        this.favoritesSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }
}
