import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class AirportsService {
    private airports: any[] = [];
    airportsSubject = new Subject<any[]>();

    constructor(private http: HttpClient) {
        this.getAirports();
    }

    emitAirports() {
        this.airportsSubject.next(this.airports.slice());
    }

    getAirports() {
        this.http.get<any[]>('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json')
            .subscribe(
            (response) => {
                this.airports = response;

                this.airports = this.airports.filter(
                    airport => airport.icao.length > 0
                );
                this.emitAirports();
            }
        );
    }
}
