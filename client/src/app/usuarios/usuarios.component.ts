import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { UsuariosService } from '../services/usuarios-service.service';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'acciones',
  ];
  dataSource = new MatTableDataSource(this.datos);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // onEdit() {
  //   this.openDialog();
  //   console.log('click en editar');
  // }

  // recuperamos los datos desde el servicio
  get datos(){
    return this.usuariosService.datos;
  }

  constructor(private usuariosService: UsuariosService) {}
  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogAnimationsDialog);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
