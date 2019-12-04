import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from '../services/toastr.service';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    // Constructeur de la classe
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private toastr: ToastrService,
                private loadingService: LoadingService) {
        this.loadingService.updateLoading(true);
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signInForm = this.formBuilder.group({
            // Permet de vérifier le pattern de l'email
            email: ['', [Validators.required]],
            // Permet de vérifier le pattern du mot de passe
            password: ['', [Validators.required]]
        });
    }

    // Lorsque l'on envoie le formulaire
    onSubmit() {
        this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).then(
            () => {
                // Si l'authentification c'est bien déroulé
                this.toastr.toastrSuccess('Connexion', 'Bienvenue ' + this.signInForm.value.email + ' sur Airport Tracker.');
                this.router.navigate(['']);
            },
            () => {
                // S'il y a eu un erreur
                this.toastr.toastrError(
                    'Connexion', 'Le compte ' + this.signInForm.value.email + ' n\'existe pas ou a été supprimé.'
                );
            }
        );
    }
}
