import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AirportsService {
    private airportDetails: any = [];
    private airportArrival: any = [];
    private airports: any = [];
    airportDetailsSubject = new Subject<any>();
    airportArrivalSubject = new Subject<any>();
    airportsSubject = new Subject<any>();

    // Constructeur de la classe
    constructor(private http: HttpClient) { }

    // Permet de mettre à jour les sujets de airportDetails
    emitAirportDetails() {
        this.airportDetailsSubject.next(this.airportDetails);
    }

    // Permet de mettre à jour les sujets de airportArrival
    emitAirportArrival() {
        this.airportArrivalSubject.next(this.airportArrival);
    }

    // Permet de mettre à jour les sujets de airports
    emitAirports() {
        this.airportsSubject.next(this.airports);
    }

    // Permet de récupérer un aéroport grace à son icao
    getAirportDetails(icao: string) {
        this.http.get<any>(
            'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json')
            .subscribe(data => {
                this.airportDetails = data.filter(
                    airport => airport.icao === icao
                );
                this.emitAirportDetails();
            });
    }

    // Permet de récupérer l'aéroport d'arrivé par rapport à un vol qui est passé en paramètre
    getAirportArrival(flights: any) {
        this.http.get<any>(
            'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json')
            .subscribe(data => {
                this.airportArrival = [];
                for (const flight of flights) {
                    for (const element of data) {
                        if (flight.estArrivalAirport === element.icao) {
                            this.airportArrival.push([flight.firstSeen, flight.lastSeen, flight.estArrivalAirport, element.name]);
                            break;
                        }
                    }
                }
                this.emitAirportArrival();
            });
    }

    // Permet de récupérer tous les aéroports
    getAirports() {
        this.http.get<any>(
            'https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json'
            ).subscribe(response => {
                this.airports = response.filter(
                    airport => airport.icao.length > 0
                );
                this.emitAirports();
            }
        );
    }
}
