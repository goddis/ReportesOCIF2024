import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { validacionesCampos } from '../../utils/validaciones';
import { Usuario } from '../../interfaces/Usuario';
import { Area } from '../../interfaces/Area';
import {GrupoSeguridad} from '../../interfaces/GrupoSeguridad';
import { UsuariosService } from '../../services/usuarios-service.service';
import { AreasService } from '../../services/areas-service.service';
import { GruposSeguridadService } from '../../services/grupos-seguridad-service.service';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css',
})
export class FormUsuarioComponent {
  form: FormGroup;

  areas: Area[] = [];
  gruposSeg: GrupoSeguridad[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private areasService: AreasService,
    private gruposSeguridadService: GruposSeguridadService
  ) {
    this.form = this.fb.group({
      numDocumento: [
        '',
        [
          validacionesCampos.validacionObligatorio,
          validacionesCampos.validacionNumero,
        ],
      ],
      nombres: [
        '',
        [
          validacionesCampos.validacionObligatorio,
          validacionesCampos.validacionString,
        ],
      ],
      apellidos: [
        '',
        [
          validacionesCampos.validacionObligatorio,
          validacionesCampos.validacionString,
        ],
      ],
      areas: ['', validacionesCampos.validacionObligatorio],
      gruposSeg: ['', validacionesCampos.validacionObligatorio],
      correoUsuario: [
        '',
        [
          validacionesCampos.validacionObligatorio,
          validacionesCampos.validacionEmail,
        ],
      ],
      password: [
        '',
        [
          validacionesCampos.validacionObligatorio,
          validacionesCampos.validacionPassword,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerGruposSeguridad();

  }
  obtenerAreas(){
    return this.areasService.getAreas().subscribe((data) => {
      this.areas = data;
    });
  }

  obtenerGruposSeguridad(){
    return this.gruposSeguridadService.getGruposSeguridad().subscribe((data) => {
      this.gruposSeg = data;
    });
  }

  onSelectionChange(event: { value: String }) {
    console.log(event.value);
  }

  onRegresar(): void {
    this.dialogRef.close();
  }

  onAgregarEditarUsuario(): void {
    if (this.form.invalid) {
      return;
    }
    const usuario: Usuario = {
      usuario: this.form.value.correoUsuario,
      numero_id: this.form.value.numDocumento,
      nombre: this.form.value.nombres,
      apellido: this.form.value.apellidos,
      area_id: this.form.value.areas,
      tipo_grupo_seguridad_id: this.form.value.gruposSeg,
      password: this.form.value.password
    };

    this.usuariosService.addUsuario(usuario).subscribe(()=>{
      //TODO dialog mensaje resultado de la acción
      console.log("Se ha guardado el usuario exitosamente");
      this.dialogRef.close();
      
    });
  }
}
