import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ConfirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 ? { passwordIdentical: true } : null;
};
