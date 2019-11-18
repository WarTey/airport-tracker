import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedGuardService } from './services/logged-guard.service';
import { NotLoggedGuardService } from './services/not-logged-guard.service';
import { ToastrService } from './services/toastr.service';

const appRoutes: Routes = [
    { path: 'connexion', canActivate: [LoggedGuardService], component: SignInComponent },
    { path: 'inscription', canActivate: [LoggedGuardService], component: SignUpComponent }
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
        AuthService,
        LoggedGuardService,
        NotLoggedGuardService,
        ToastrService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
