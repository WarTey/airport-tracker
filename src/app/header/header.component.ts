import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { ToastrService } from '../services/toastr.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    isAuth: boolean;

    constructor(private authService: AuthService, private toastr: ToastrService) {}

    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.isAuth = !!user;
            }
        );
    }

    onSignOut() {
        this.toastr.toastrSuccess('Déconnexion', 'À bientôt de vous revoir.');
        this.authService.signOut();
    }
}
