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
  s_obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.endpointAPI}/usuarios`);
  }

  s_eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.endpointAPI}/usuarios/${id}`);
  }

  s_agregarsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(
      `${environment.endpointAPI}/usuarios/`,
      usuario
    );
  }

  s_obtenerUsuario(id: number): Observable<Usuario> {
    console.log("ID s_obtener", id);
    return this.http.get<Usuario>(`${environment.endpointAPI}/usuarios/${id}`);
  }

  s_actualizarUsuario(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${environment.endpointAPI}/usuarios/${id}`, usuario);
  }

  constructor(private http: HttpClient) { }
}
