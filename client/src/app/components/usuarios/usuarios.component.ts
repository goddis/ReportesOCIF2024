import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { UsuariosService } from '../../services/usuarios-service.service';
import { Usuario } from '../../interfaces/Usuario';
import { colors } from '../../../styles';
import { exportarExcel, exportarPDF } from '../../funciones/utilsTablas';

import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    HttpClientModule,
    FormDialogComponent,
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
    'area_name',
    'grupo_seguridad',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Usuario>();
  columnasExp: string[] = [];
  black = colors.black;
  white = colors.white;
  blue = colors.blue;
  green = colors.green;
  gray = colors.gray;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    // columnas que se van a exportar en los archivos
    this.columnasExp = [
      'Usuario',
      'Cédula',
      'Nombre',
      'Apellido',
      'Área',
      'Grupo de seguridad',
    ];
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

  // se recuperan los datos desde el servicio
  obtenerUsuarios() {
    return this.usuariosService.getUsuarios().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // se recupera la tabla en excel
  onExportarExcel() {
    const datosTabla = this.dataSource.data.map((row) => [
      row.username,
      row.number_id,
      row.name,
      row.lastname,
      row.area_name,
      row.grupo_seguridad,
    ]);
    const nombreExcel = 'Usuarios.xlsx';
    exportarExcel(nombreExcel, this.columnasExp, datosTabla);
  }

  // se recupera la tabla en pdf
  onExportarPDF() {
    const datosTabla = this.dataSource.data.map((row) => [
      row.username,
      row.number_id,
      row.name,
      row.lastname,
      row.area_name,
      row.grupo_seguridad,
    ]);
    const nombrePdf = 'Usuarios.pdf';
    exportarPDF(nombrePdf, this.columnasExp, datosTabla);
  }

  onEdit() {
    this.openDialog();
    console.log('click en editar');
  }

  onDelete() {
    // this.openDialog();
    console.log('click en eliminar');
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Registros por página';
}
