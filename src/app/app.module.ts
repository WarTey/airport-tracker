import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
    { path: 'connexion', component: SignInComponent },
    { path: 'inscription', component: SignUpComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
