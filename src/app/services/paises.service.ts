import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private http:HttpClient = inject(HttpClient);
  URL_API = 'https://restcountries.com/v3.1';

  getPaises(region: string): Observable<Pais[]> {
    return this.http.get(`${this.URL_API}/region/${region}?fields=name,languages,flags`).pipe(
      map((paises: any) => {
        return paises.map((pais: any) => ({
          nombre: pais.name.common,
          nombreOficial: pais.name.official,
          idioma: pais.languages,
          bandera: pais.flags.png
        }));
      })
    );
  }
  
}