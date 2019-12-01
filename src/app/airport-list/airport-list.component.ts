import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { fromLonLat } from 'ol/proj.js';
import {AirportsService} from '../services/airports.service';
import {Subscription} from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})

export class AirportListComponent implements OnInit {
    airportsSubscription: Subscription;
    airportCoordinate: any = [];
    airportList: any = [];

    constructor(private http: HttpClient, private airportsService: AirportsService) {
    }

    ngOnInit() {
        this.airportsService.getAirports();
        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any[]) => {
                this.airportList = airports;

                const map = L.map('map').setView([28.06847852612482, 5.668678294263798], 2);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: 'map'
                }).addTo(map);

                const myIcon = L.icon({
                    iconSize:     [20, 20],
                    iconUrl : 'assets/airplane.png',
                });

                // tslint:disable-next-line:forin
                for (const element in this.airportList) {
                    this.airportCoordinate[element] =  fromLonLat([this.airportList[element].lon, this.airportList[element].lat]);

                    // version Hover :
                    let marker;
                    const airportName = this.airportList[element].name;

                    marker = L.marker([this.airportList[element].lat, this.airportList[element].lon], {icon: myIcon}).
                    // tslint:disable-next-line:max-line-length
                    bindPopup('<div>' + '<strong>' + this.airportList[element].name + '</strong>' + '<p>' + this.airportList[element].city + ', ' +  this.airportList[element].state +  '<br>' + this.airportList[element].country + '</p><div/>').addTo(map).on('click', e => {
                        markerClick(e, airportName);
                    });

                    function markerClick(e, name) {
                        document.location.href = 'https://fr.wikipedia.org/wiki/' + name;
                    }

                    marker.on('mouseover', ev => {
                        ev.target.openPopup();
                    });
                }
            }
        );
    }
}
