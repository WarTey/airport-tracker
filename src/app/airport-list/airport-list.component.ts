import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

    airportList: any;
    map: any;

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
    }
}
