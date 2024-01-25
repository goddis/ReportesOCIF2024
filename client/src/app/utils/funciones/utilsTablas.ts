import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// funcion para exportar la tabla en excel
export function exportarExcel(
  nombreExcel: string,
  columnas: string[],
  datosTabla: (string | number)[][]
) {
  // se hace match entre columnas y datos
  datosTabla.splice(0, 0, columnas);

  // se genera el workbook y la worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datosTabla);
  XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

  // se guarda el archivo excel
  XLSX.writeFile(wb, nombreExcel);
}

// funcion para exportar tabla en pdf
export function exportarPDF(
  nombrePDF: string,
  columnas: string[],
  datosTabla: (string | number)[][]
) {
  const doc = new jsPDF.default();
  // se genera la tabla en el documento pdf
  autoTable(doc, {
    head: [columnas],
    body: datosTabla,
    styles: {
      cellPadding: 1, // espacio entre el contenido de la celda y el borde
      fontSize: 10,
      valign: 'middle', // alineacion vertical
      halign: 'center', // alineacion horizontal
    },
  });
  // se descarga el archivo pdf
  doc.save(nombrePDF);
}
