import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, lockClosed, logIn, eye, eyeOff, flash } from 'ionicons/icons';

import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class LoginPage implements OnInit {

  showPassword = false;
  isLoading = false;
  
  // --- CAMBIO REALIZADO AQUÍ ---
  // Ahora usamos 'correo' y 'contrasena'
  credentials = {
    correo: '',
    contrasena: ''
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({ person, lockClosed, logIn, eye, eyeOff, flash });
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    // --- CAMBIO REALIZADO AQUÍ (Validación) ---
    if (!this.credentials.correo || !this.credentials.contrasena) {
      this.mostrarAlerta('Campos vacíos', 'Por favor ingresa tu usuario y contraseña.');
      return;
    }

    this.isLoading = true;

    // Nota: Asegúrate de que tu AuthService espere recibir { correo, contrasena }
    this.authService.login(this.credentials).subscribe({
      next: async (response) => {
        this.isLoading = false;
        console.log('Login exitoso:', response);
        this.navCtrl.navigateRoot('/tabs/tab1');
      },
      error: async (error) => {
        this.isLoading = false;
        console.error('Error en login:', error);
        
        let mensaje = 'Usuario o contraseña incorrectos.';
        if (error.status === 0) {
          mensaje = 'No se pudo conectar con el servidor. Verifica tu internet.';
        }
        
        await this.mostrarAlerta('Error de acceso', mensaje);
      }
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}