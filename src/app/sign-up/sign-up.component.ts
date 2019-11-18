import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        });
    }

    onSubmit() {
        this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(
            () => {
                this.router.navigate(['']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }
}
