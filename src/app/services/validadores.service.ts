import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';


interface ErrorValidate {

  [s: string]: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }



  // Comprobar si existe el usuario
  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

    // Mientras carga se hace que sea invalido
    if ( !control.value ) {
      return Promise.resolve( null );
    }

    return new Promise( (resolve, reject ) => {

      // La idea es simular que es una petición http para ver si existe el usuario en una base de datos
      // Aca simulamos el tiempo en 3 segundos y medio
      setTimeout( () => {

        if ( control.value === 'strider' ) {
          resolve({ existe: true });
        } else {
          resolve( null );
        }

      }, 3500);

    } );

  }

  // Comprobar que no sea Herrera
  noHerrera( control: FormControl ): ErrorValidate {

    if ( control.value?.toLowerCase() === 'herrera' ) { // El signo de interrogación es por si no existe

        return {
          noHerrera: true
        };

    } else {

      return null;

    }

  }

  // Para comparar dos contraseñas si son iguales (recibiendo un formulario y devolviendo una función para comprorbar asyncrono)
  passwordsIguales( pass1Name: string, pass2Name: string  ): ( (formGroup: FormGroup) => void ) {

    return( formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {

        pass2Control.setErrors(null); // No devuelve error

      } else {

        pass2Control.setErrors( { noEsIgual: true } ); // Devuelve error

      }

    };

  }


}
