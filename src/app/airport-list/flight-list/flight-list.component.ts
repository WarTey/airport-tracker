import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Subject, Subscription } from 'rxjs';
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
    dtOptions: DataTables.Settings = { };
    dtTrigger = new Subject();
    tableLoaded = false;

    @Input() airportICAO: string;
    @Input() airportName: string;
    @Output() eventICAO = new EventEmitter();
    airportsSubscription: Subscription;
    flightsSubscription: Subscription;
    airports: any = [];
    flights: any = [];

    // Constructeur de la classe
    constructor(private flightsService: FlightsService, private airportsService: AirportsService) { }

    ngOnInit() {
        // Permet d'initialiser DataTables
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25
        };

        // Permet de récupérer les vols
        this.flightsService.getFlights(this.airportICAO);
        this.flightsSubscription = this.flightsService.flightsSubject.subscribe(
            (flights: any) => {
                this.flights = flights;
                this.airportsService.getAirportArrival(this.flights); // Permet de récupérer les aéroports d'arrivées
            }
        );

        this.airportsSubscription = this.airportsService.airportArrivalSubject.subscribe(
            (airport: any) => {
                this.airports = airport;
                if (this.tableLoaded) {
                    this.rerender(); // Permet de recharger le tableau dynamiquement
                }
            }
        );
    }

    ngAfterViewInit() {
        this.dtTrigger.next();
        this.tableLoaded = true;
    }

    // Permet de recharger le tableau dynamiquement
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
        this.airportsSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }
}
