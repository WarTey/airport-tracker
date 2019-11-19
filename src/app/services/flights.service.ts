import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FlightsService {
    private flights: any[] = [];
    flightsSubject = new Subject<any[]>();

    constructor(private http: HttpClient) { }

    emitFlights() {
        this.flightsSubject.next(this.flights.slice());
    }

    getFlights(icao: string) {
        const currentDate = Math.floor(new Date().getTime() / 1000);
        this.http.get<any[]>('https://opensky-network.org/api/flights/departure?airport=' +
            '' + icao + '&begin=' + (currentDate - 86400) + '&end=' + currentDate)
            .subscribe(data => {
                this.flights = data;
                this.emitFlights();
            });
    }
}
