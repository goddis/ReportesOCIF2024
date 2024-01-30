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

import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import { exportarExcel, exportarPDF } from '../../utils/funciones/utilsTablas';

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
    FormUsuarioComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: (string | number)[] = [
    'usuario',
    'numero_id',
    'nombre',
    'apellido',
    'area_nombre',
    'grupo_seguridad',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Usuario>();
  columnasExp: string[] = [];
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
    return this.usuariosService.s_obtenerUsuarios().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // se recupera la tabla en excel
  onExportarExcel() {
    const datosTabla = this.dataSource.data.map((row) => [
      row.usuario,
      row.numero_id,
      row.nombre,
      row.apellido,
      row.area_nombre ?? '',
      row.grupo_seguridad ?? '',
    ]);
    const nombreExcel = 'Usuarios.xlsx';
    exportarExcel(nombreExcel, this.columnasExp, datosTabla);
  }

  // se recupera la tabla en pdf
  onExportarPDF() {
    const datosTabla = this.dataSource.data.map((row) => [
      row.usuario,
      row.numero_id,
      row.nombre,
      row.apellido,
      row.area_nombre ?? '',
      row.grupo_seguridad ?? '',
    ]);
    const nombrePdf = 'Usuarios.pdf';
    exportarPDF(nombrePdf, this.columnasExp, datosTabla);
  }

  onOpenForm(id?: number) {
    this.openFormDialog(id);
  }

  onDelete(idUsuario: number) {
    // this.openDialog();
    //TODO abrir dialog de confirmacion
    console.log('click en eliminar', idUsuario);
    return this.usuariosService.s_eliminarUsuario(idUsuario).subscribe(() => {
      this.obtenerUsuarios();
    });
    //TODO abrir dialog de accion exitosa
  }

  openFormDialog(id?: number) {
    const dialogRef = this.dialog.open(FormUsuarioComponent, {
      disableClose: true,
      data: { id: id },
    });
    // en el dialog.open se pueden agregar caracteristicas al dialog
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerUsuarios();
    });
  }

}

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Registros por página';
}
