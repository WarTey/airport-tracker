import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Injectable()
export class LeafletService {
    private map: any;
    private markers: any = [];

    constructor(private router: Router) { }

    loadDynamicMap() {
        // Configuration de la map (longitude, latitude, zoom)
        this.map = L.map('map').setView([28.06847852612482, 5.668678294263798], 2);
        // Initialisation de la map
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'map'
        }).addTo(this.map);
    }
    // Création d'une icon personnalisée (taille de l'icone et image de l'icone)
    addIcon(coords: number[], name: string, city: string, state: string, country: string, icao: string) {
        const myIcon = L.icon({
            iconSize: [20, 20],
            iconUrl: 'assets/airplane.png',
        });
        // Initialise le marker avec la position et l'icone
        this.markers.push(L.marker([coords[0], coords[1]], {icon: myIcon}).bindPopup(
            // Creation de la popup qui s'affichera au passage de la souris
            '<div>' +
                '<strong>' + name + '</strong>' +
                '<p>' +
                    city + ', ' +  state +
                    '<br>' +
                    country +
                '</p>' +
            '<div/>').addTo(this.map).on('click', e => { this.router.navigate(['details/' + icao]); }));
        // Permet d'afficher la popup au passage de la souris sur l'icone
        this.markers[this.markers.length - 1].on('mouseover', event => {
            event.target.openPopup();
        });
    }

    // Permet de supprimer un marker
    clearIcon() {
        for (const element of this.markers) {
            element.remove();
        }
        this.markers = [];
    }
}
