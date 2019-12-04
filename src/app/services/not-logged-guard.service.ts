import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class NotLoggedGuardService implements CanActivate {
    // Constructeur de la classe
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                // Récupère l'état de la personne (connectée ou non )
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            // Si la personne est connectée alors elle a accès à la route
                            resolve(true);
                        } else {
                            // Si la personne n'est pas connectée
                            // alors elle n'a pas accès à la route et est redirigée vers la page de connexion
                            this.router.navigate(['connexion']);
                            resolve(false);
                        }
                    }
                );
            }
        );
    }
}
