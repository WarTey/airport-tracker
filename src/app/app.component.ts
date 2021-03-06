import { Component, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
    loadingSubscription: Subscription;
    loading = false;

    constructor(private loadingService: LoadingService, private location: Location) {
        // Configuration de Firebase
        const firebaseConfig = {
            apiKey: 'AIzaSyD83xKoJKtuuH2enK7iHSXYutt3dQizx4M',
            authDomain: 'airport-tracker-179c5.firebaseapp.com',
            databaseURL: 'https://airport-tracker-179c5.firebaseio.com',
            projectId: 'airport-tracker-179c5',
            storageBucket: 'airport-tracker-179c5.appspot.com',
            messagingSenderId: '304653827453',
            appId: '1:304653827453:web:9d4e76468e1cbc61112014'
        };
        // Initialise Firebase
        firebase.initializeApp(firebaseConfig);

        if (location.path() === '/connexion' || location.path() === '/inscription') {
            this.loading = true;
        }
        this.loadingSubscription = this.loadingService.loadingSubject.subscribe(
            (loading: boolean) => {
                this.loading = loading;
            }
        );
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}
