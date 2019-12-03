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

    // Permet d'initialiser la map static qui sera présente dans la page de détails d'un aéroport
    loadStaticMap(coords: number[], zoom: number) {
        // Permet d'initialiser la map
        this.map = new Map({
            // Permet de cibler la balise html qui va être remplacé par la map
            target: 'map',
            controls: [],
            interactions: [],
            layers: [
                new TileLayer({
                    // Initialise la map avec openstreetmap
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            view: new View({
                // Permet d'initialiser le centre de la map et le zoom. Ici le centre est sur un aéroport spécifique et le zoom est à 10 (passé en paramètre lors de l'appel de la fonction)
                center: fromLonLat(coords),
                zoom
            })
        });
        // Permet d'initialiser le marker
        this.marker = new Feature({
            geometry: new Point(
                // Permet d'initialiser la position du marker avec les coordonnées de l'aéroport
                fromLonLat(coords),
            ),
        });
        // Permet de modifier le style du marker
        this.marker.setStyle(new style.Style({
            // Permet de changer l'image du marker de base par l'icone d'un avion
            image: new style.Icon(({
                src: '../assets/airplaneStatic.png',
            }))
        }));
        // Permet d'ajouter le marker au vecteur
        const vectorSource = new Vector({
            features: [ this.marker]
        });
        // Permet d'ajouter le vecteur au layer
        const markerVectorLayer = new VectorL({
            source: vectorSource,
        });
        // Permet d'ajouter le marker à la map
        this.map.addLayer(markerVectorLayer);
    }

    // Permet de mettre à jour les coordonnées du centre de la map quand on clic sur un autre aéroport
    changeMapCenter(coords: number[]) {
        this.map.getView().setCenter(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    }
    // Permet de mettre à jour les coordonnées du centre du marker quand on clic sur un autre aéroport
    changeMarkerCenter(coords: number[]) {
        this.marker.getGeometry().setCoordinates(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    }
}
