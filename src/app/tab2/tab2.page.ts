import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { options, wifi, bulb, bulbOutline, alertCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {

  selectedLamp: any = null;

  // AGREGUÉ 2 FOCOS MÁS (105 y 106) Y REAJUSTÉ POSICIONES
  lamps = [
    { id: 101, name: 'L-101', status: 'active',  x: 20, y: 30, power: '0.8 kWh' },
    { id: 102, name: 'L-102', status: 'active',  x: 60, y: 30, power: '0.9 kWh' },
    { id: 103, name: 'L-103', status: 'warning', x: 40, y: 60, power: '1.2 kWh' },
    { id: 104, name: 'L-104', status: 'inactive', x: 25, y: 80, power: '0.0 kWh' },
    // Nuevos
    { id: 105, name: 'L-105', status: 'active',  x: 80, y: 65, power: '0.8 kWh' },
    { id: 106, name: 'L-106', status: 'active',  x: 85, y: 20, power: '0.9 kWh' }
  ];

  constructor() {
    addIcons({ options, wifi, bulb, 'bulb-outline': bulbOutline, 'alert-circle': alertCircle });
  }

  toggleInfo(lamp: any) {
    if (this.selectedLamp === lamp) {
      this.selectedLamp = null;
    } else {
      this.selectedLamp = lamp;
    }
  }
}