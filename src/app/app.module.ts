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
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AirportListComponent } from './airport-list/airport-list.component';
import { SingleAirportComponent } from './airport-list/single-airport/single-airport.component';
import { FlightListComponent } from './airport-list/flight-list/flight-list.component';
import { HttpClientModule } from '@angular/common/http';
import {FlightsService} from './services/flights.service';

const appRoutes: Routes = [
    { path: 'test', component: FlightListComponent },
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
        AirportListComponent,
        SingleAirportComponent,
        FlightListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        LoggedGuardService,
        NotLoggedGuardService,
        ToastrService,
        FlightsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
