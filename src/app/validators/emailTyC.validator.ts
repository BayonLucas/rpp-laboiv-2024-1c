import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function coincidirEmailValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        
        const email = formGroup.get('email');
        const emailPreRegister = JSON.parse(localStorage.getItem('nuevoUsuario')!).email;

        const respuestaError = { noCoincide: 'El email debe coincidir con el regitrado anteriormente' };

        if (email?.value !== emailPreRegister) {
            formGroup.get('email')?.setErrors(respuestaError);
            return respuestaError;
        } 
        else {
            formGroup.get('email')?.setErrors(null);
            return null;
        }
    };
}