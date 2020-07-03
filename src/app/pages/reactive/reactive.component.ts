import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(  private fb: FormBuilder,
                private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  // getters
  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNovalido(): boolean {
    return ( this.forma.get('nombre').invalid && this.forma.get('nombre').touched );
  }

  get apellidoNovalido(): boolean {
    return ( this.forma.get('apellido').invalid && this.forma.get('apellido').touched );
  }

  get correoNovalido(): boolean {
    return ( this.forma.get('correo').invalid && this.forma.get('correo').touched );
  }

  get usuarioNoValido(): boolean {
    return ( this.forma.get('usuario').invalid && this.forma.get('usuario').touched );
  }

  get distritoNovalido(): boolean {
    return ( this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched );
  }

  get ciudadNovalido(): boolean {
    return ( this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched );
  }

  get pass1NoValido(): boolean {
    return ( this.forma.get('pass1').invalid && this.forma.get('pass1').touched );
  }

  get pass2NoValido(): boolean {

    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;

  }


  // Métodos
  crearFormulario(): void {

    this.forma = this.fb.group({

      nombre    : ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido  : ['', [ Validators.required, Validators.minLength(5), this.validadores.noHerrera ] ],
      correo    : ['', [ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' )] ],
      usuario   : ['', , this.validadores.existeUsuario], // puede no poner el segundo argumento, dejandolo vacio entre las comas
      pass1     : ['', Validators.required ],
      pass2     : ['', Validators.required ],
      direccion : this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),

      pasatiempos: this.fb.array([])

    }, {
      // A nivel formulario asyncValidators (sino uno creado)
      validators: this.validadores.passwordsIguales('pass1', 'pass2') // Validador personal asyncrono
    });

  }

  crearListeners(): void {

    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // } );

    // this.forma.statusChanges.subscribe( status => {
    //   console.log(status);
    // } );

    // Obtener el valor de un campo en tiempo real (prueba )
    this.forma.get('nombre').valueChanges.subscribe( console.log );


  }

  cargarDataAlFormulario(): void {

    // this.forma.setValue({ // Aca hay que setear un valor para cada dato
    this.forma.reset({ // Aca se puede exceptuar algunos datos

      nombre: 'Fulano',
      apellido: 'De Tal',
      correo: 'prueba@asd.com',
      direccion: {
        distrito: 'distrito Fulano',
        ciudad: 'ciudad de Tal'
      },
      // Estos de abajo son temporales, obviamente no deberia estar en una aplicación
      pass1: '123',
      pass2: '123'

    });

    // Una forma de agregar un conjunto de valores al arreglo de pasatiempos
    // ['Comer', 'Videojuegos'].forEach( valor => this.pasatiempos.push( this.fb.control(valor) ) )

  }

  agregarPasatiempo(): void {

    // Agregar elemento con validación
    this.pasatiempos.push( this.fb.control('', Validators.required) );

  }

  borrrarPasatiempo( i: number): void {
    this.pasatiempos.removeAt( i );
  }

  guardar(): void {

    console.log( this.forma );

    // Marcar datos inválidos
    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        // Si es un objeto
        if ( control instanceof FormGroup ) {

          Object.values( control.controls ).forEach( subControl => subControl.markAsTouched() );

        } else {

          control.markAsTouched(); // Marcar todos como tocadas

        }

      } );

    }

    // Posteo de información
    this.forma.reset({
      nombre: 'Sin Nombre'
    });

  }

}
