import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { UsuariosService } from '../services/usuarios-service.service';
import { Usuario } from '../interfaces/Usuario';
import { colors } from '../../styles';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'username',
    'number_id',
    'name',
    'lastname',
    'area_id',
    'tipo_grupo_seguridad_id'
  ];
  dataSource = new MatTableDataSource<Usuario>();
  black = colors.black;
  white = colors.white;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private usuariosService: UsuariosService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

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
  obtenerUsuarios() {
    return this.usuariosService.getUsuarios().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogAnimationsDialog);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
