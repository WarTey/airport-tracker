import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

    airportList: any;

    constructor(http: HttpClient) {
        http.get('https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json').subscribe( data => { this.airportList = data; });
    }

  ngOnInit() {
  }

}
