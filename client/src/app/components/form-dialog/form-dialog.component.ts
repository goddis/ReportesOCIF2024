import {Component} from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [ CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css',
})
export class FormDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  // ejemplo input form validado string
  nombre = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z ]+$/),
  ]);
  // ejemplo validacion campo numerico
  numero = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]*$/),
  ]);
  options = [
    'Primera opcion',
    'Segunda opcion',
    'Tercera opcion',
    'Cuarta opcion',
  ];
  constructor(public dialogRef: MatDialogRef<FormDialogComponent>) {}

  getErrorRequiredMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'El campo es obligatorio';
    }
    return;
  }

  onSelectionChange(event: { value: String }) {
    console.log(event.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
