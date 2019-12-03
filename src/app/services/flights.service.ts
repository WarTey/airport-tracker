import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FlightsService {
    private flights: any = [];
    flightsSubject = new Subject<any>();

    constructor(private http: HttpClient) { }

    // Permet de mettre à jour les sujets
    emitFlights() {
        this.flightsSubject.next(this.flights);
    }

    // Permet de récupérer les vols qui ont pour lieu de départ un certain aéroport (connu grâce à son icao)
    getFlights(icao: string) {
        // Récupère la date précédent la date du jour
        const currentDate = Math.floor(new Date().getTime() / 1000) - 86400;
        // Récupère les vols de la veille qui ont pour aéroport de départ celui dont l'icao à été donné
        this.http.get<any>('https://opensky-network.org/api/flights/departure?airport=' +
            '' + icao + '&begin=' + (currentDate - 86400 * 2) + '&end=' + currentDate)
            .subscribe(data => {
                // Permet de supprimer les vols qui ne sont pas encore arrivés
                this.flights = data.filter(
                    flight => flight.estArrivalAirport != null
                );
                // Permet de récupérer les dates de départ et d'arrivé de chaque avions
                for (const flight of this.flights) {
                    flight.firstSeen = new Date(flight.firstSeen * 1000);
                    flight.lastSeen = new Date(flight.lastSeen * 1000);
                }
                this.emitFlights();
            });
    }
}
