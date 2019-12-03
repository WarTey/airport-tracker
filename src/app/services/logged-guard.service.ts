import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class LoggedGuardService implements CanActivate {
    // Constructeur de la classe
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        // Si la personne est connectée alors elle n'a pas accès à la page de connection et d'inscription et est redirigé via la route not-found
                        if (user) {
                            this.router.navigate(['not-found']);
                            resolve(false);
                        }
                        // Si la personne n'est pas connectée alors elle a accès à la page de connection et d'inscription
                        else {
                            resolve(true);
                        }
                    }
                );
            }
        );
    }
}
