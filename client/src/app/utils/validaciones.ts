import { Validators } from "@angular/forms";

export const validacionesCampos ={
    validacionNumero: Validators.pattern(/^[0-9]*$/),
    validacionString: Validators.pattern(/^[a-zA-Z ]+$/),
    validacionEmail: Validators.email,
    validacionObligatorio: Validators.required,
    // minimo 1 letra, minimo 1 numero, longitud total minima 8 caracteres
    validacionPassword: Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
}