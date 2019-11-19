import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggedGuardService } from './services/logged-guard.service';
import { NotLoggedGuardService } from './services/not-logged-guard.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AirportListComponent } from './airport-list/airport-list.component';
import { AirportsService } from './services/airports.service';

const appRoutes: Routes = [
    { path: '', component: AirportListComponent },
    { path: 'connexion', canActivate: [LoggedGuardService], component: SignInComponent },
    { path: 'inscription', canActivate: [LoggedGuardService], component: SignUpComponent },
    { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SignInComponent,
        SignUpComponent,
        FourOhFourComponent,
        AirportListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule
    ],
    providers: [
        AuthService,
        LoggedGuardService,
        NotLoggedGuardService,
        AirportsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
