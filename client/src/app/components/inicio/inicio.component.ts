import { Component } from '@angular/core';
import {PruebamenuComponent} from '../pruebamenu/pruebamenu.component'
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [PruebamenuComponent, MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
