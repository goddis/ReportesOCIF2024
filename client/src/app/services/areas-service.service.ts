import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../interfaces/Area';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  s_obtenerAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${environment.endpointAPI}/areas`);
  }

  constructor(private http: HttpClient) { }
}
