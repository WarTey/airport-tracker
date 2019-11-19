import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import Vector from 'ol/source/Vector';
import VectorL from 'ol/layer/Vector';
import * as style from 'ol/style';
import {AirportsService} from '../services/airports.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

    airportList: any[];
    airportsSubscription: Subscription;
    map: any;
    marker: any[] = [];
    airport: any;

    constructor(private http: HttpClient, private airportsService: AirportsService) {
    }

    ngOnInit() {
        this.airportsSubscription = this.airportsService.airportsSubject.subscribe(
            (airports: any[]) => {
                this.airportList = airports;

                this.map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new XYZ({
                                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            })
                        })
                    ],
                    view: new View({
                        center: [0, 0],
                        zoom: 2
                    })
                });
                for(const element in this.airportList) {
                    this.marker[element] = new Feature({
                        geometry: new Point(
                            fromLonLat([ this.airportList[element].lon, this.airportList[element].lat])
                        ),
                    });

                    this.marker[element].setStyle(new style.Style({
                        image: new style.Icon(({
                            color: '#0000ff',
                            crossOrigin: 'anonymous',
                            src: 'assets/airplane.png',
                        }))
                    }));

                    const vectorSource = new Vector({
                        features: [ this.marker[element]]
                    });
                    const markerVectorLayer = new VectorL({
                        source: vectorSource,
                    });
                    this.map.addLayer(markerVectorLayer);
                }
            }
        );
    }
}
