import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from '../services/toastr.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthSubscription: Subscription;
    isAuth: boolean;

    // Constructeur de la classe
    constructor(private authService: AuthService, private toastr: ToastrService) { }

    ngOnInit() {
        this.authService.checkConnection();
        this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
            (auth: boolean) => {
                this.isAuth = auth;
            }
        );
    }

    onSignOut() {
        // Message dans un toastr qui apparait lors de la déconnexion
        this.toastr.toastrSuccess('Déconnexion', 'À bientôt de vous revoir.');
        this.authService.signOut();
    }

    ngOnDestroy() {
        this.isAuthSubscription.unsubscribe();
    }
}
