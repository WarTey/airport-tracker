import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
    private isAuth: boolean;
    isAuthSubject = new Subject<boolean>();

    // Permet de connecter le visiteur
    signIn(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    // Si l'email et le mot de passe corresponde à un champ dans la bdd alors le visiteur se connecte
                    () => {
                        resolve();
                        this.checkConnection();
                    },
                    // Sinon une erreur est retourné
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    // Permet d'inscrire le visiteur
    signUp(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    // Si l'email et le mot de passe on été bien saisi et qu'ils n'existe pas dans la bdd
                    // alors un compte est crée pour le visiteur
                    () => {
                        resolve();
                        this.checkConnection();
                    },
                    // Sinon une erreur est retourné
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    // Permet de deconnecter le visiteur
    signOut() {
        firebase.auth().signOut();
        this.checkConnection();
    }

    emitIsAuth() {
        this.isAuthSubject.next(this.isAuth);
    }

    checkConnection() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.isAuth = !!user;
                this.emitIsAuth();
            }
        );
    }
}
