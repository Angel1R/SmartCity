import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// 1. IMPORTAMOS LOS ICONOS
import { addIcons } from 'ionicons';
import { 
  flash, 
  map, 
  alertCircle 
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TabsPage {

  constructor() {
    // 2. REGISTRO EXACTO (Solución de errores)
    // 'alert-circle' entre comillas conecta con name="alert-circle" en el HTML
    addIcons({ 
      flash, 
      map, 
      'alert-circle': alertCircle 
    });
  }

}