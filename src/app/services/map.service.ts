import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transform, fromLonLat } from 'ol/proj.js';

@Injectable()
export class MapService {
    map: any;

    loadStaticMap(coords: number[], zoom: number) {
        this.map = new Map({
            target: 'map',
            controls: [],
            interactions: [],
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            view: new View({
                center: fromLonLat(coords),
                zoom
            })
        });
    }

    changeMapCenter(coords: number[]) {
        this.map.getView().setCenter(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    }
}
