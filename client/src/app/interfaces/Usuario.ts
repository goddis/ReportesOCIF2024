export interface Usuario {
    usuario: string;
    numero_id: number;
    nombre: string;
    apellido: string;
    area_nombre?: string,
    area_id: number,
    grupo_seguridad?: string,
    tipo_grupo_seguridad_id: number,
    password?: string
  }