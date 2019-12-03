import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class ToastrService {
    // Constructeur de la classe
    constructor() {
        toastr.options.closeButton = true;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.progressBar = true;
    }
    // Permet d'initialiser les Toastr lors d'un évenement réussi
    toastrSuccess(title: string, message: string) {
        toastr.success(message, title);
    }
    // Permet d'initialiser les Toastr lors d'un évenement qui a échoué
    toastrError(title: string, message: string) {
        toastr.error(message, title);
    }
}
