import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { fromLonLat } from 'ol/proj.js';
import {AirportsService} from '../services/airports.service';
import {Subscription} from 'rxjs';
import * as L from 'leaflet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})

export class AirportListComponent implements OnInit {
    airportsSubscription: Subscription;
    airportCoordinate: any = [];
    airportList: any = [];

    // Constructeur de la classe
    constructor(private http: HttpClient, private airportsService: AirportsService,  private router: Router) {
    }

    ngOnInit() {
        // Permet de remplir le tableau avec les infos issue de l'api
        this.airportsService.getAirports();

        // Création d'un sujet
        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any[]) => {
                this.airportList = airports;

                // Configuration de la map (longitude, latitude, zoom).
                const map = L.map('map').setView([28.06847852612482, 5.668678294263798], 2);

                // Initialisation de la map
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: 'map'
                }).addTo(map);

                // Création d'une icon personnalisée (taille de l'icone et image de l'icone)
                const myIcon = L.icon({
                    iconSize: [20, 20],
                    iconUrl : 'assets/airplane.png',
                });

                // Boucle qui permet d'aller lire chaque aéroport du tableau
                for (const element in this.airportList) {
                    // stock les coordonnées d'un aéroport dans un tableau
                    this.airportCoordinate[element] =  fromLonLat([this.airportList[element].lon, this.airportList[element].lat]);

                    // Déclaration d'un marker
                    let marker;
                    // Stockage de l'icao dans une varialbe
                    const airportIcao = this.airportList[element].icao;

                    // Initialise le marker avec la position et l'icone
                    marker = L.marker([this.airportList[element].lat, this.airportList[element].lon], {icon: myIcon}).

                    // Initialisation de la popup qui s'affichera au passage de la souris
                    bindPopup('<div>' + '<strong>' + this.airportList[element].name + '</strong>' + '<p>' + this.airportList[element].city + ', ' +  this.airportList[element].state +  '<br>' + this.airportList[element].country + '</p><div/>').addTo(map).on('click', e => {
                        markerClick(e, airportIcao, this.router);
                    });
                    // Changement de page lors du clic sur l'icone. Redirection vers la page de details de l'aeroport
                    function markerClick(e, icao, route) {
                        route.navigate(['details/' + icao]);
                    }

                    // Permet d'afficher la popup au passage de la souris sur l'icone
                    marker.on('mouseover', ev => {
                        ev.target.openPopup();
                    });
                }
            }
        );
    }
}
