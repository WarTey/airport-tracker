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
import { FlightsService } from './services/flights.service';
import { DataTablesModule } from 'angular-datatables';
import { MapService } from './services/map.service';
import { AirportsService } from './services/airports.service';
import { FavoritesService } from './services/favorites.service';
import { LoadingService } from './services/loading.service';
import { LeafletService } from './services/leaflet.service';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

const appRoutes: Routes = [
    { path: '', component: AirportListComponent },
    { path: 'favoris', canActivate: [NotLoggedGuardService], component: FavoriteListComponent },
    { path: 'details/:icao', component: SingleAirportComponent },
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
        FlightListComponent,
        FavoriteListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule
    ],
    providers: [
        AuthService,
        LoggedGuardService,
        NotLoggedGuardService,
        ToastrService,
        FlightsService,
        MapService,
        AirportsService,
        FavoritesService,
        LoadingService,
        LeafletService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
