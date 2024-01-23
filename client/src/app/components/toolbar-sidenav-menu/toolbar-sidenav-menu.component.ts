import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-toolbar-sidenav-menu',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, 
  MatListModule, MatIconModule, MatSelectModule, FormsModule, UsuariosComponent],
  templateUrl: './toolbar-sidenav-menu.component.html',
  styleUrl: './toolbar-sidenav-menu.component.css'
})
export class ToolbarSidenavMenuComponent {
  opened=true;
}
