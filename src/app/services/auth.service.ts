import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    // Permet de connecter le visiteur
    signIn(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    // Si l'email et le mot de passe corresponde à un champ dans la bdd alors le visiteur se connecte
                    () => {
                        resolve();
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
                    // Si l'email et le mot de passe on été bien saisi et qu'ils n'existe pas dans la bdd alors un compte est crée pour le visiteur
                    () => {
                        resolve();
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
    }
}
