import { Component } from '@angular/core';
import {PruebamenuComponent} from '../pruebamenu/pruebamenu.component'

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [PruebamenuComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
