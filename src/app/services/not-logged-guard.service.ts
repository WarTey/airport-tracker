import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class NotLoggedGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                        } else {
                            this.router.navigate(['connexion']);
                            resolve(false);
                        }
                    }
                );
            }
        );
    }
}
