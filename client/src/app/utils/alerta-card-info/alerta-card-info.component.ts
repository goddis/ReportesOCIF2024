import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-alerta-card-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './alerta-card-info.component.html',
  styleUrl: './alerta-card-info.component.css',
})
export class AlertaCardInfoComponent {
  mensaje: string = '';
  imagen: string = '';
  constructor(
    public dialogRef: MatDialogRef<AlertaCardInfoComponent>,
    private utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.obtenerInfoCard();
  }
  obtenerInfoCard() {
    const respuestaForm = this.data.respuestaForm;
    const tipoForm = this.data.tipoForm;
    this.mensaje = this.utilsService.s_obtenerMensajeAlerta(respuestaForm, tipoForm);
    this.imagen = this.utilsService.s_obtenerImagenAlerta(respuestaForm);
  }

  cerrarCardAlerta(): void {
    this.dialogRef.close();
  }
}
