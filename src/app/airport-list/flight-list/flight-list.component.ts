import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import {Subject, Subscription} from 'rxjs';
import { AirportsService } from '../../services/airports.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-flight-list',
    templateUrl: './flight-list.component.html',
    styleUrls: ['./flight-list.component.css']
})

export class FlightListComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();
    tableLoaded = false;

    flightsSubscription: Subscription;
    flightList: any = [];
    @Input() airportICAO: string;
    @Input() airportName: string;
    @Output() eventICAO = new EventEmitter();
    airportSubscription: Subscription;
    airport: any = [];

    constructor(private flightsService: FlightsService, private airportsService: AirportsService) { }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25
        };

        this.flightsService.getFlights(this.airportICAO);
        this.flightsSubscription = this.flightsService.flightsSubject.subscribe(
            (flights: any) => {
                this.flightList = flights;
                this.airportsService.getAirportArrival(this.flightList);
            }
        );
        this.airportSubscription = this.airportsService.airportArrivalSubject.subscribe(
            (airport: any) => {
                this.airport = airport;
                if (this.tableLoaded) {
                    this.rerender();
                }
            }
        );
    }

    ngAfterViewInit() {
        this.dtTrigger.next();
        this.tableLoaded = true;
    }

    rerender() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }

    onReload(icao: string) {
        this.eventICAO.emit(icao);
        this.flightsService.getFlights(icao);
    }

    ngOnDestroy() {
        this.flightsSubscription.unsubscribe();
        this.airportSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }
}