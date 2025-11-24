import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// 1. IMPORTAR addIcons y CADA ICONO QUE USASTE
import { addIcons } from 'ionicons';
import { 
  statsChart, 
  flash, 
  trendingDown, 
  bulb, 
  thermometer, 
  speedometer, 
  alertCircle, 
  flashOff, 
  eye, 
  warning 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {

  // Variables para la animación
  displayConsumo: number = 0;
  displayActivas: number = 0;
  displayTemp: number = 0;
  displayVoltaje: number = 0;
  displayFallas: number = 0;

  constructor() {
    // 2. REGISTRAR LOS ICONOS AQUÍ
    // Esto conecta el nombre HTML (ej: "alert-circle") con el icono real
    addIcons({ 
      'stats-chart': statsChart,
      flash,
      'trending-down': trendingDown,
      bulb,
      thermometer,
      speedometer,
      'alert-circle': alertCircle,
      'flash-off': flashOff,
      eye,
      warning
    });
  }

  ngOnInit() {
    // Animaciones de números
    this.animateValue(0, 94.8, 1500, (val) => this.displayConsumo = val);
    this.animateValue(0, 850, 2000, (val) => this.displayActivas = val);
    this.animateValue(0, 27, 1200, (val) => this.displayTemp = val);
    this.animateValue(0, 220, 1800, (val) => this.displayVoltaje = val);
    this.animateValue(0, 3, 1000, (val) => this.displayFallas = val);
  }

  animateValue(start: number, end: number, duration: number, callback: (val: number) => void) {
    let startTimestamp: any = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); 
      const currentVal = progress === 1 ? end : start + (end - start) * easeOut;
      callback(end % 1 !== 0 ? parseFloat(currentVal.toFixed(1)) : Math.floor(currentVal));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}