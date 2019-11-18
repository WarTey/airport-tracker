import {Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor() {
        // Web app's Firebase configuration
        const firebaseConfig = {
            apiKey: 'AIzaSyD83xKoJKtuuH2enK7iHSXYutt3dQizx4M',
            authDomain: 'airport-tracker-179c5.firebaseapp.com',
            databaseURL: 'https://airport-tracker-179c5.firebaseio.com',
            projectId: 'airport-tracker-179c5',
            storageBucket: 'airport-tracker-179c5.appspot.com',
            messagingSenderId: '304653827453',
            appId: '1:304653827453:web:9d4e76468e1cbc61112014'
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
}
