import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoadingService {
    private loading: boolean;
    loadingSubject = new Subject<boolean>();

    emitLoading() {
        this.loadingSubject.next(this.loading);
    }

    updateLoading(loading: boolean) {
        this.loading = loading;
        this.emitLoading();
    }
}
