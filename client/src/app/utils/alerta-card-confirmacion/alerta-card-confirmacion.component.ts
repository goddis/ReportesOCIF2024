import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { UtilsService } from '../../services/utils.service';
import { UsuariosService } from '../../services/usuarios-service.service';
import { AlertaCardInfoComponent } from '../alerta-card-info/alerta-card-info.component';

@Component({
  selector: 'app-alerta-card-confirmacion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './alerta-card-confirmacion.component.html',
  styleUrl: './alerta-card-confirmacion.component.css',
})
export class AlertaCardConfirmacionComponent implements OnInit {
  eliminarClicked: boolean = false;
  card: any = {};
  constructor(
    public dialogRef: MatDialogRef<AlertaCardConfirmacionComponent>,
    public dialogRefInfoCard: MatDialogRef<AlertaCardInfoComponent>,
    public dialog: MatDialog,
    private utilsService: UtilsService,
    private usuariosService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.card = this.utilsService.s_obtenerMensajeConfirmacion('eliminar');
  }

  get idUsuarioSeleccionado() {
    return this.data.id;
  }
  onYesClick() {
    const idUsuario = this.idUsuarioSeleccionado;
    let respuestaForm: string = '';
    this.usuariosService.s_eliminarUsuario(idUsuario).subscribe(
      (data) => {
        respuestaForm = data.respuesta;
        this.openAlertaCardInfo(respuestaForm);
        this.dialogRefInfoCard.close();
      },
      (error) => {
        respuestaForm = 'error';
        this.openAlertaCardInfo(respuestaForm);
        console.error(error);
      }
    );
  }

  openAlertaCardInfo(respuestaForm: string) {
    this.dialog.open(AlertaCardInfoComponent, {
      disableClose: true,
      // le pasamos la respuesta que retorna el form al dialog de alerta
      data: {
        respuestaForm: respuestaForm,
        tipoForm: 'eliminación',
      },
    });
  }
  cerrarCard(): void {
    this.dialogRef.close();
  }
}
