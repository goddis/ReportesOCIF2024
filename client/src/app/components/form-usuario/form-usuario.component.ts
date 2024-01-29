import { getAreas } from './../../../../../server/src/controllers/areas.controller';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
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
import { GrupoSeguridad } from '../../interfaces/GrupoSeguridad';
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
  titulo: string = 'Agregar ';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private areasService: AreasService,
    private gruposSeguridadService: GruposSeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const validacionObligatorio = validacionesCampos.validacionObligatorio;

    this.form = this.fb.group({
      numDocumento: ['', [validacionObligatorio, validacionesCampos.validacionNumero]],
      nombres: ['', [validacionObligatorio, validacionesCampos.validacionString]],
      apellidos: ['', [validacionObligatorio, validacionesCampos.validacionString]],
      areas: ['', validacionObligatorio],
      gruposSeg: ['', validacionObligatorio],
      correoUsuario: ['', [validacionObligatorio, validacionesCampos.validacionEmail]],
      password: ['', [validacionObligatorio, validacionesCampos.validacionPassword]],
    })

    this.id = data.id;
  }

  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerGruposSeguridad();
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.titulo = 'Editar ';
      this.obtenerUsuario(id);
    }
  }

  obtenerUsuario(id: number) {
    return this.usuariosService.s_obtenerUsuario(id).subscribe((data) => {
      //Diferencia entre patchValue y SetValue es que el primero no es obligatorio llenar todos los campos y el segundo si.
      this.form.patchValue({
        numDocumento: data.numero_id,
        nombres: data.nombre,
        apellidos: data.apellido,
        areas: data.area_id,
        gruposSeg: data.tipo_grupo_seguridad_id,
        correoUsuario: data.usuario,
        password: data.password
      })
    });
  }

  agregarUsuario(usuario: Usuario) {
    this.usuariosService.s_agregarsuario(usuario).subscribe(() => {
      //TODO dialog mensaje resultado de la acción
      console.log("Se ha guardado el usuario exitosamente");
      this.dialogRef.close();
    });
  }

  actualizarUsuario(id: number, usuario: Usuario) {
    this.usuariosService.s_actualizarUsuario(id, usuario).subscribe((data) => {
      //TODO dialog mensaje resultado de la acción
      console.log("Se ha actualizado el usuario exitosamente");
      this.dialogRef.close();
    });
  }

  obtenerAreas() {
    return this.areasService.s_obtenerAreas().subscribe((data) => {
      this.areas = data;
    });
  }

  obtenerGruposSeguridad() {
    return this.gruposSeguridadService.s_obtenerGruposSeguridad().subscribe((data) => {
      this.gruposSeg = data;
    });
  }

  Regresar(): void {
    this.dialogRef.close();
  }

  onSelectionChange(event: { value: String }) {
    console.log(event.value);
  }

  AgregarEditarUsuario(): void {

    if (this.form.invalid) {
      return;
    }

    const { correoUsuario: usuario, numDocumento: numero_id, nombres: nombre, apellidos: apellido, areas: area_id, gruposSeg: tipo_grupo_seguridad_id, password } = this.form.value;
    const _usuario_: Usuario = {
      usuario,
      numero_id,
      nombre,
      apellido,
      area_id,
      tipo_grupo_seguridad_id,
      password
    };

    if (this.id == undefined) {
      this.agregarUsuario(_usuario_);

    } else {
      this.actualizarUsuario(this.id, _usuario_);
    }

  }
}
