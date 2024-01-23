import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ToolbarSidenavMenuComponent } from './components/toolbar-sidenav-menu/toolbar-sidenav-menu.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsuariosComponent, HttpClientModule, ToolbarSidenavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ReportesOcif';
}
