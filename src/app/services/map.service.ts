import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Vector from 'ol/source/Vector';
import VectorL from 'ol/layer/Vector';
import * as style from 'ol/style';
import { transform, fromLonLat } from 'ol/proj.js';

@Injectable()
export class MapService {
    map: any;
    marker: any;

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
        this.marker = new Feature({
            geometry: new Point(
                fromLonLat(coords),
            ),
        });
        this.marker.setStyle(new style.Style({
            image: new style.Icon(({
                src: '../assets/airplaneStatic.png',
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

    changeMapCenter(coords: number[]) {
        this.map.getView().setCenter(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    }
    changeMarkerCenter(coords: number[]) {
        this.marker.getGeometry().setCoordinates(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    }
}
