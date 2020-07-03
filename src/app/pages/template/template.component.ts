import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {


  usuario = {
    nombre: 'Momfus',
    apellido: 'Arboleo',
    correo: 'prueba@outlook.com'
  };

  constructor() { }

  ngOnInit(): void {
  }

  public guardar( forma: NgForm ): void {
    console.log('Submit Disparado');

    // Ver si el formulario es invalido para marcarlo como touched y controlar las validaciones
    if ( forma.invalid ) {

      Object.values( forma.controls ).forEach( control => {

        control.markAsTouched(); // Marcar todos como tocadas

      } );

      return;
    }

    // Mensajes de prueba de valores
    console.log(forma);
    console.log(forma.value);
  }

}
