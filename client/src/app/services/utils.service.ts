import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  s_obtenerMensajeAlerta(respuestaForm: string, tipoForm: string) {
    let mensajeAlerta = '';
    if (respuestaForm != 'error') {
      if (respuestaForm == 'success') {
        mensajeAlerta = `¡Proceso de ${tipoForm} del registro se ha realizado exitosamente!`;
      }
      if (respuestaForm == 'existe') {
        mensajeAlerta =
          'Lo sentimos, no se pudo guardar el registro porque ya existe.';
      }
    } else {
      mensajeAlerta = `Ocurrió un error en el proceso de ${tipoForm} del registro. Intente de nuevo.`;
    }
    return mensajeAlerta;
  }

  s_obtenerImagenAlerta(respuestaForm: string) {
    let rutaImagen = '';
    if (respuestaForm == 'success') {
      rutaImagen = '../../../assets/images/ProcesoExitoso.png';
    } else {
      rutaImagen = '../../../assets/images/ProcesoError.png';
    }
    return rutaImagen;
  }

  s_obtenerMensajeConfirmacion(tipoAccion: string) {
    const card = {
      titulo: `¿Está seguro de ${tipoAccion} el registro?`,
      cuerpo: 'Recuerde que se eliminará permanentemente.',
      imagen: '../../../assets/images/EstaSeguro.png',
    };
    return card;
  }

  constructor() {}
}
