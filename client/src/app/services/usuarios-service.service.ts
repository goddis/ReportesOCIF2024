import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  // para obtener los datos en cualquier componente que use el servicio
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.endpointAPI}/usuarios`);
  }
  constructor(private http: HttpClient) {}
}
