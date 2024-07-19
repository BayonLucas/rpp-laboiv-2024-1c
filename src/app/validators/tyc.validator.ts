import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function tycValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const respuestaError = { noAceptado: 'Debe aceptar los terminos y condiciones para poder terminar con el registro' };

        const tyc = formGroup.get('tyc');

        console.log(tyc)

        if (tyc?.value !== true) {
            formGroup.get('tyc')?.setErrors(respuestaError);
            return respuestaError;
        } 
        else {
            formGroup.get('tyc')?.setErrors(null);
            return null;
        }
    };
}