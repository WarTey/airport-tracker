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

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

    airportList: any;
    map: any;
    marker: any;

    constructor(http: HttpClient) {
        // tslint:disable-next-line:max-line-length
        http.get('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json').subscribe( data => { this.airportList = data; });
    }

    ngOnInit() {
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

        this.marker = new Feature({
            geometry: new Point(
                fromLonLat([-73.79, 40.6437])
            ),
        });

        this.marker.setStyle(new style.Style({
            image: new style.Icon(({
                color: '#0000ff',
                crossOrigin: 'anonymous',
                src: 'assets/airplane.png'
            }))
        }));

        const vectorSource = new Vector({
            features: [ this.marker]
        });
        const markerVectorLayer = new VectorL({
            source: vectorSource,
        });
        this.map.addLayer(markerVectorLayer);
    }
}
