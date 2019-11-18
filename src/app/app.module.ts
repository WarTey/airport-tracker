import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

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
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
