import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../validators/confirm-password.validator';
import { ToastrService } from '../services/toastr.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
            confirmPassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        }, { validators: ConfirmPasswordValidator });
    }

    onSubmit() {
        this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(
            () => {
                this.router.navigate(['']);
                this.toastr.toastrSuccess('Connexion', 'Bienvenue ' + this.signUpForm.value.email + ' sur Airport Tracker.');
            },
            () => {
                this.toastr.toastrError('Inscription', 'Une erreur est survenue. Il est possible que ce compte existe déjà.');
            }
        );
    }
}
