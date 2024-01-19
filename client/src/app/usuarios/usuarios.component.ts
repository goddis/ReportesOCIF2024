import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { UsuariosService } from '../services/usuarios-service.service';
import { Usuario } from '../interfaces/Usuario';
import { colors } from '../../styles';

import { FormDialogComponent } from '../form-dialog/form-dialog.component';

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
    MatGridListModule,
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

  // recuperamos los datos desde el servicio
  obtenerUsuarios() {
    return this.usuariosService.getUsuarios().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // funcion para exportar la tabla en excel
  exportarExcel() {
    // nombre del archivo que se descarga
    const excelName = 'Usuarios.xlsx';
    // se obtienen los datos de la tabla (se filtra del datasource solo las columnas que se exportan)
    const datosTabla = this.dataSource.data.map((row) => [
      row.username,
      row.number_id,
      row.name,
      row.lastname,
      row.area_name,
      row.grupo_seguridad,
    ]);
    // se obtienen los datos con sus columnas
    datosTabla.splice(0, 0, this.columnasExp);

    // se genera el workbook y la worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datosTabla);
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // se guarda el archivo excel
    XLSX.writeFile(wb, excelName);
  }

  // funcion para exportar la tabla en pdf
  exportarPDF() {
    const pdfName = 'Usuarios.pdf';
    const doc = new jsPDF.default();
    // se obtienen los datos de la tabla (se filtra del datasource solo las columnas que se exportan)
    const datosTabla = this.dataSource.data.map((row) => [
      row.username,
      row.number_id,
      row.name,
      row.lastname,
      row.area_name,
      row.grupo_seguridad,
    ]);
    // se genera la tabla en el documento pdf
    autoTable(doc, {
      head: [this.columnasExp],
      body: datosTabla,
      styles: {
        cellPadding: 1, // espacio entre el contenido de la celda y el borde
        fontSize: 10,
        valign: 'middle', // alineacion vertical
        halign: 'center' // alineacion horizontal
      }
    });
    // se descarga el archivo pdf
    doc.save(pdfName);
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

