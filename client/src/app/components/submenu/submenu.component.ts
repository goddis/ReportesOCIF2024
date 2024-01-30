import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css'
})
export class SubmenuComponent {
  @Input() subMenuItems: any[] | undefined;
}
