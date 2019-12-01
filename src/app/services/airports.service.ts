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

    constructor(private http: HttpClient) { }

    emitAirportDetails() {
        this.airportDetailsSubject.next(this.airportDetails);
    }

    emitAirportArrival() {
        this.airportArrivalSubject.next(this.airportArrival);
    }

    emitAirports() {
        this.airportsSubject.next(this.airports);
    }

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

    getAirports() {
        this.http.get<any>('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json')
            .subscribe(response => {
                this.airports = response;

                this.airports = this.airports.filter(
                    airport => airport.icao.length > 0
                );
                this.emitAirports();
            }
        );
    }
}
