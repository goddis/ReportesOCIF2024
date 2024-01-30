import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navbarData } from '../../utils/sidenav-menu/nav-data';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pruebamenu',
  standalone: true,
  imports: [],
  template: `
  
  <!-- <div>
  <ul>
    <li *ngFor="let item of navInfoOpcionesMenu" (click)="toggleSubMenu(item)">
      {{ item.label }}
      <ul *ngIf="item.submenuVisible">
        <li *ngFor="let subitem of item.submenu">
          {{ subitem.label }}
        </li>
      </ul>
    </li>
  </ul>
</div> -->

<!-- <mat-list class="mat-list-sidenav">
            <mat-list-item *ngFor="let item of navInfoOpcionesMenu" (click)="toggleSubMenu(item)" class="mat-list-item-sidenav">
                <a [routerLink]="[item.routeLink]" routerLinkActive="active"
                    [routerLinkActiveOptions]="{exact:true}" class="nav-link">
                    <mat-icon class="icon-link">{{item.icon}}</mat-icon>
                    <span class="nav-link-label">{{item.label}}</span>
                </a>
                <mat-list *ngIf="item.submenuVisible">
        <mat-list-item *ngFor="let subitem of item.submenu">
          {{ subitem.label }}
        </mat-list-item>
      </mat-list>
      -->
        
  `,
  styleUrl: './pruebamenu.component.css'
})
export class PruebamenuComponent {
  navInfoOpcionesMenu = navbarData;
  menuItems = [
    {
      name: 'Item 1',
      submenu: [
        { name: 'Subitem 1' },
        { name: 'Subitem 1' },
        { name: 'Subitem 1' },
        // other subitems
      ],
      submenuVisible: false
    },
    {
      name: 'Item 2',
      submenu: [
        { name: 'Subitem 2' },
        { name: 'Subitem 2' },
        { name: 'Subitem 2' },
        // other subitems
      ],
      submenuVisible: false
    },
    // other items
  ];

  toggleSubMenu(item: any) {
    item.submenuVisible = !item.submenuVisible;
  }
}