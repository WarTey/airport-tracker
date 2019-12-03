import {Injectable} from '@angular/core';
import * as L from 'leaflet';

@Injectable()
export class LeafletService {
    private map: any;

    loadDynamicMap() {
        this.map = L.map('map').setView([28.06847852612482, 5.668678294263798], 2);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'map'
        }).addTo(this.map);
    }

    addIcon(coords: number[], name: string, city: string, state: string, country: string) {
        const myIcon = L.icon({
            iconSize: [20, 20],
            iconUrl: 'assets/airplane.png',
        });
        const marker = L.marker([coords[0], coords[1]], {icon: myIcon}).bindPopup(
            '<div>' +
                '<strong>' + name + '</strong>' +
                '<p>' +
                    city + ', ' +  state +
                    '<br>' +
                    country +
                '</p>' +
            '<div/>').addTo(this.map).on('click', e => { document.location.href = 'https://fr.wikipedia.org/wiki/' + name; });
        marker.on('mouseover', event => {
            event.target.openPopup();
        });
    }
}
