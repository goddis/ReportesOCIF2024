import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';
import { GrupoSeguridad } from '../interfaces/GrupoSeguridad';

@Injectable({
  providedIn: 'root'
})
export class GruposSeguridadService {
  s_obtenerGruposSeguridad(): Observable<GrupoSeguridad[]> {
    return this.http.get<GrupoSeguridad[]>(`${environment.endpointAPI}/grupoSeguridad`);
  }
  constructor(private http: HttpClient) { }
}
