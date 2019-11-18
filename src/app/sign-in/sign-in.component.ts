import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from '../services/toastr.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
    signInForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).then(
            () => {
                this.toastr.toastrSuccess('Connexion', 'Bienvenue ' + this.signInForm.value.email + ' sur Airport Tracker.');
                this.router.navigate(['']);
            },
            () => {
                this.toastr.toastrError('Connexion', 'Le compte ' + this.signInForm.value.email + ' n\'existe pas ou a été supprimé.');
            }
        );
    }
}
