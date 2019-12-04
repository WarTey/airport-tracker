import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../validators/confirm-password.validator';
import { ToastrService } from '../services/toastr.service';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;

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
        this.signUpForm = this.formBuilder.group({
            // Permet de vérifier le pattern de l'email
            email: ['', [Validators.required, Validators.email]],
            // Permet de vérifier le pattern du mot de passe
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
            // Permet de vérifier le pattern du champ de confirmation du mot de passe
            confirmPassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        }, { validators: ConfirmPasswordValidator });
    }

    // Lorsque l'on envoie le formulaire
    onSubmit() {
        this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(
            () => {
                // Si l'authentification c'est bien déroulé
                this.router.navigate(['']);
                this.toastr.toastrSuccess('Connexion', 'Bienvenue ' + this.signUpForm.value.email + ' sur Airport Tracker.');
            },
            () => {
                // S'il y a eu un erreur
                this.toastr.toastrError('Inscription', 'Une erreur est survenue. Il est possible que ce compte existe déjà.');
            }
        );
    }
}
