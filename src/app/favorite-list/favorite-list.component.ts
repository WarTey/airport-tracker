import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { FavoritesService } from '../services/favorites.service';
import { AirportsService } from '../services/airports.service';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from '../services/toastr.service';
import { DataTableDirective } from 'angular-datatables';

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
    favorites: Favorite[] = [];
    airportsSubscription: Subscription;
    airports: any = [];
    loaded = false;

    constructor(private favoritesService: FavoritesService,
                private airportsService: AirportsService,
                private loadingService: LoadingService,
                private toastr: ToastrService) {
        this.loadingService.updateLoading(false);
    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };

        this.favoritesSubscription = this.favoritesService.favoritesSubject.subscribe(
            (favorites: Favorite[]) => {
                this.favorites = favorites.filter(
                    favorite => this.favoritesService.checkFavorite(favorite.icao, favorite.id)
                );

                this.airportsService.getAirports();
                this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
                    (airports: any) => {
                        this.airports = airports.filter(
                            airport => {
                                for (const element of this.favorites) {
                                    if (element.icao === airport.icao) {
                                        return true;
                                    }
                                }
                            }
                        );
                        if (!this.loaded) {
                            this.dtTrigger.next();
                            setTimeout(
                                () => {
                                    this.loadingService.updateLoading(true);
                                    this.loaded = true;
                                }, 2000
                            );
                        }
                    }
                );
            }
        );
    }

    onDelete(icao, name) {
        this.favoritesService.removeFavorite(icao);
        this.toastr.toastrError('Favoris', name + ' retiré des favoris.');
    }

    ngOnDestroy() {
        this.airportsSubscription.unsubscribe();
        this.favoritesSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }
}
