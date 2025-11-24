import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  
  constructor(private authService: AuthService) {} // <--- Inyectar

  ngOnInit() {
    // Al iniciar la app, activamos el "despertador"
    this.authService.startKeepAlive();
  }

  ngOnDestroy() {
    // (Opcional) Limpiamos el intervalo si la app se destruye totalmente
    this.authService.stopKeepAlive();
  }
}