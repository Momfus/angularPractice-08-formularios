import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder) {

    this.crearFormulario();

  }

  ngOnInit(): void {
  }

  // getters
  get nombreNovalido(): boolean {
    return ( this.forma.get('nombre').invalid && this.forma.get('nombre').touched );
  }

  get apellidoNovalido(): boolean {
    return ( this.forma.get('apellido').invalid && this.forma.get('apellido').touched );
  }

  get correoNovalido(): boolean {
    return ( this.forma.get('correo').invalid && this.forma.get('correo').touched );
  }

  get distritoNovalido(): boolean {
    return ( this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched );
  }

  get ciudadNovalido(): boolean {
    return ( this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched );
  }


  // Métodos
  crearFormulario(): void {

    this.forma = this.fb.group({

      nombre  : ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido: ['', [ Validators.required, Validators.minLength(5) ] ],
      correo  : ['', [ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' )] ],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      })

    });

  }


  guardar(): void {

    console.log( this.forma );


    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        // Si es un objeto
        if( control instanceof FormGroup ) {

          Object.values( control.controls ).forEach( subControl => subControl.markAsTouched() );

        } else {

          control.markAsTouched(); // Marcar todos como tocadas

        }

      } );

    }


  }

}
