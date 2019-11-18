import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
                this.router.navigate(['']);
            },
            (error) => {
                this.errorMessage = error;
            }
        );
    }
}
