import { navbarData } from './../../utils/sidenav-menu/nav-data';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-toolbar-sidenav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatSidenavModule,
    MatListModule, MatIconModule, MatSelectModule, FormsModule, UsuariosComponent],
  templateUrl: './toolbar-sidenav-menu.component.html',
  styleUrl: './toolbar-sidenav-menu.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class ToolbarSidenavMenuComponent {
  opened = true;
  navInfoOpcionesMenu = navbarData;
  
  // OnhandleClick(submenu: any) {
  //   submenu.openSubMenu = !submenu.openSubMenu;
  // }

  toggleSubMenu(clickedMenu: any) {
    // Cerrar todos los submenús
    this.navInfoOpcionesMenu.forEach(menu => {
      if (menu !== clickedMenu) {
        menu.openSubMenu = false;
      }
    });
    clickedMenu.openSubMenu = !clickedMenu.openSubMenu;
  }
}
