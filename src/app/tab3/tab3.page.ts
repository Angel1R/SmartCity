import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// 1. IMPORTAR ICONOS
import { addIcons } from 'ionicons';
import { 
  notifications, 
  closeCircle, 
  warning, 
  construct, 
  arrowForward, 
  documentText 
} from 'ionicons/icons';

// 2. IMPORTAR LIBRERÍA PDF
// Importamos pdfmake. Si te marca error aquí en VS Code, asegúrate de haber corrido 'npm install pdfmake'
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab3Page implements OnInit {

  healthScore: number = 0;
  
  // Datos de alertas para mostrar y para el PDF
  alerts = [
    { 
      id: 1, type: 'critical', title: 'Corriente Cero', 
      desc: 'Lámpara 105 (Sur) sin consumo pero encendida.', time: '10 min', icon: 'close-circle' 
    },
    { 
      id: 2, type: 'warning', title: 'Voltaje Inestable', 
      desc: 'Zona Norte variando +/- 10V.', time: '45 min', icon: 'warning' 
    },
    { 
      id: 3, type: 'info', title: 'Mantenimiento', 
      desc: 'Zona Este - Revisión de cableado.', time: '2h', icon: 'construct' 
    }
  ];

  constructor() {
    // Registrar iconos para que se vean en el HTML
    addIcons({ 
      notifications, 
      'close-circle': closeCircle, 
      warning, 
      construct, 
      'arrow-forward': arrowForward, 
      'document-text': documentText 
    });

    // === CORRECCIÓN VITAL PARA LAS FUENTES DEL PDF ===
    // Usamos (any) para silenciar el error de TypeScript sobre propiedades de solo lectura
    // y verificamos ambas rutas posibles donde pdfmake guarda las fuentes.
    const pdfMakeInstance = pdfMake as any;
    const pdfFontsInstance = pdfFonts as any;

    if (pdfFontsInstance && pdfFontsInstance.pdfMake && pdfFontsInstance.pdfMake.vfs) {
        pdfMakeInstance.vfs = pdfFontsInstance.pdfMake.vfs;
    } else if (pdfFontsInstance && pdfFontsInstance.vfs) {
        pdfMakeInstance.vfs = pdfFontsInstance.vfs;
    }
  }

  ngOnInit() {
    // Animación del círculo de salud (0% -> 92%)
    this.animateHealth(0, 92, 2000);
  }

  animateHealth(start: number, end: number, duration: number) {
    let startTimestamp: any = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (end - start) * easeOut;
      this.healthScore = Math.floor(currentVal);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  // === FUNCIÓN DESCARGAR PDF ===
  downloadPDF() {
    
    // Definimos docDefinition como 'any' para evitar errores de validación estricta de tipos
    const docDefinition: any = {
      header: { text: 'SmartCity Secure - Reporte Oficial', style: 'headerStyle', margin: [20, 20, 20, 0] },
      content: [
        { text: 'Reporte de Estado del Sistema', style: 'title' },
        { text: `Fecha de emisión: ${new Date().toLocaleString()}`, style: 'subtitle' },
        { text: '\n' }, 

        // Caja de Resumen de Salud
        {
          canvas: [ { type: 'rect', x: 0, y: 0, w: 515, h: 35, r: 5, color: '#f0fdf4' } ],
          absolutePosition: { x: 40, y: 130 }
        },
        { text: `Salud Global del Sistema: ${this.healthScore}% Operativo`, style: 'healthText', margin: [10, 10, 0, 20], color: '#166534' },

        { text: '\n\n' },

        { text: 'Detalle de Alertas Recientes:', style: 'sectionHeader' },
        
        // Tabla de Alertas
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto'],
            body: [
              // Encabezados con estilos explícitos
              [ 
                { text: 'TIPO', style: 'tableHeader', fillColor: '#333333', color: 'white' }, 
                { text: 'DESCRIPCIÓN DE FALLA', style: 'tableHeader', fillColor: '#333333', color: 'white' }, 
                { text: 'TIEMPO', style: 'tableHeader', fillColor: '#333333', color: 'white' } 
              ],
              // Filas dinámicas
              ...this.alerts.map(alert => [
                { 
                  text: alert.type.toUpperCase(), 
                  color: alert.type === 'critical' ? 'red' : (alert.type === 'warning' ? '#f59e0b' : '#3b82f6'), 
                  bold: true 
                },
                { text: `${alert.title}\n${alert.desc}`, fontSize: 10 },
                { text: alert.time, alignment: 'right', italics: true }
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        },

        { text: '\n\nEste documento es generado automáticamente por el sistema de monitoreo SmartCity.', style: 'footer', alignment: 'center' }
      ],
      
      // Estilos del PDF
      styles: {
        headerStyle: { fontSize: 9, color: 'gray', alignment: 'right' },
        title: { fontSize: 22, bold: true, color: '#0f172a' },
        subtitle: { fontSize: 11, color: '#64748b', italics: true },
        healthText: { fontSize: 14, bold: true },
        sectionHeader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        tableHeader: { bold: true, fontSize: 12, margin: [0, 5, 0, 5] },
        footer: { fontSize: 8, color: 'gray', margin: [0, 20, 0, 0] }
      }
    };

    // Generar y descargar
    // Usamos 'as any' para invocar createPdf sin comprobación estricta
    (pdfMake as any).createPdf(docDefinition).download('Reporte_SmartCity.pdf');
  }
}