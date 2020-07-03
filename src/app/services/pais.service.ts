import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class PaisService {

  constructor( private http: HttpClient ) { }

  public getPaises(): Observable<any> {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
              .pipe(
                // Obtengo los campos que me intersan de cada objetos del endpoint recibido
                map( (res: any[]) => { // este map es el de rxjs del observador
                  return res.map( pais => { // este map es de los arreglos (no confundirlo con el anterior)
                    return {

                      nombre: pais.name,
                      codigo: pais.alpha3Code

                    }
                  });
                })
              );

  }

}
