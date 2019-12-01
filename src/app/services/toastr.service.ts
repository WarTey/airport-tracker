import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class ToastrService {
    constructor() {
        toastr.options.closeButton = true;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.progressBar = true;
    }

    toastrSuccess(title: string, message: string) {
        toastr.success(message, title);
    }

    toastrError(title: string, message: string) {
        toastr.error(message, title);
    }

    toastrWarning(title: string, message: string) {
        toastr.warning(message, title);
    }
}
