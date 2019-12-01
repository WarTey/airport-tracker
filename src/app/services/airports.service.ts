import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AirportsService {
    private airportDetails: any = [];
    private airportArrival: any = [];
    airportDetailsSubject = new Subject<any>();
    airportArrivalSubject = new Subject<any>();

    constructor(private http: HttpClient) { }

    emitAirportDetails() {
        this.airportDetailsSubject.next(this.airportDetails);
    }

    emitAirportArrival() {
        this.airportArrivalSubject.next(this.airportArrival);
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
}
