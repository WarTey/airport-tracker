import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Favorite } from '../models/favorite.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class FavoritesService {
    private favorites: Favorite[] = [];
    favoritesSubject = new Subject<Favorite[]>();

    constructor() {
        this.getFavorites();
    }

    emitFavorites() {
        this.favoritesSubject.next(this.favorites);
    }

    addFavorite(icao: string) {
        this.favorites.push(new Favorite(firebase.auth().currentUser.uid, icao));
        this.saveFavorites();
        this.emitFavorites();
    }

    removeFavorite(icao: string) {
        const favoriteIndexToRemove = this.favorites.findIndex(
            (favoriteEl) => {
                if (favoriteEl.icao === icao && favoriteEl.id === firebase.auth().currentUser.uid) {
                    return true;
                }
            }
        );
        this.favorites.splice(favoriteIndexToRemove, 1);
        this.saveFavorites();
        this.emitFavorites();
    }

    saveFavorites() {
        firebase.database().ref('/favorites').set(this.favorites);
    }

    getFavorites() {
        firebase.database().ref('/favorites').on('value', (data: DataSnapshot) => {
            this.favorites = data.val() ? data.val() : [];
            this.emitFavorites();
        });
    }

    checkFavorite(icao: string, id?: string) {
        for (const element of this.favorites) {
            if (id) {
                if ((element.icao === icao && element.id === firebase.auth().currentUser.uid && element.id === id)) {
                    return true;
                }
            } else  {
                if ((element.icao === icao && element.id === firebase.auth().currentUser.uid)) {
                    return true;
                }
            }
        }
        return false;
    }
}
