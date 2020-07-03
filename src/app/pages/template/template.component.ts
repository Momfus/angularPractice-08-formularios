import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Momfus',
    apellido: 'Arboleo',
    correo: 'prueba@outlook.com',
    pais: 'ARG' // Cpdogp
  };

  paises: any[] = [];


  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    // Disparo la petición http del servicio
    this.paisService.getPaises()
      .subscribe( paises => {
        this.paises = paises;

        this.paises.unshift({// valor por defecto

          nombre: '[ Seleccione País ]',
          codigo: ''

        });
        // console.log(this.paises);

      } );

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
