import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
    selector: 'app-four-oh-four',
    templateUrl: './four-oh-four.component.html',
    styleUrls: ['./four-oh-four.component.css']
})

export class FourOhFourComponent implements OnInit {
    loaded = false;

    constructor(private loadingService: LoadingService) {
        this.loadingService.updateLoading(false);
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.loadingService.updateLoading(true);
                this.loaded = true;
            }, 1000
        );
    }
}
