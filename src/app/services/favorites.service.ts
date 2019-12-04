import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Favorite } from '../models/favorite.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class FavoritesService {
    private favorites: Favorite[] = [];
    favoritesSubject = new Subject<Favorite[]>();

    // Constructeur de la classe
    constructor() {
        this.getFavorites();
    }

    // Permet de mettre à jour les sujets
    emitFavorites() {
        this.favoritesSubject.next(this.favorites);
    }

    // Permet d'ajouter un aéroport a un tableau local
    addFavorite(icao: string) {
        this.favorites.push(new Favorite(firebase.auth().currentUser.uid, icao));
        this.saveFavorites();
        this.emitFavorites();
    }

    // Permet de supprimer un aéroport de son tableau local
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

    // Permet d'envoyer le nouveau tableau de favoris à Firebase
    saveFavorites() {
        firebase.database().ref('/favorites').set(this.favorites);
    }

    // Permet de récupérer tous les favoris
    getFavorites() {
        firebase.database().ref('/favorites').on('value', (data: DataSnapshot) => {
            this.favorites = data.val() ? data.val() : [];
            this.emitFavorites();
        });
    }

    // Permet de vérifier si un aéroport est dans notre liste de favoris (grâce à son icao)
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
