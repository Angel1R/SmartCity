import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular'; // Importar AlertController
import { addIcons } from 'ionicons';
import { person, mail, lockClosed, arrowForward, eye, eyeOff } from 'ionicons/icons';

// Importar el servicio
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'], // Reusamos estilos
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  showPassword = false;
  isLoading = false;

  // Objeto para los datos del formulario
  userData = {
    nombre: '',
    correo: '',
    contrasena: ''
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,       // Inyectar AuthService
    private alertController: AlertController // Inyectar AlertController
  ) {
    addIcons({ person, mail, lockClosed, arrowForward, eye, eyeOff });
  }

  ngOnInit() { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    if (!this.userData.nombre || !this.userData.correo || !this.userData.contrasena) {
      this.mostrarAlerta('Error', 'Por favor completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userData.correo)) {
      this.mostrarAlerta('Error', 'El correo no tiene un formato válido.');
      return;
    }

    if (this.userData.contrasena.length < 8) {
      this.mostrarAlerta('Error', 'La contraseña debe tener mínimo 8 caracteres.');
      return;
    }

    this.isLoading = true;

    this.authService.register(this.userData).subscribe({
      next: async (response: any) => {
        this.isLoading = false;
        await this.mostrarAlerta('Cuenta Creada', 'Tu registro fue exitoso. Ahora inicia sesión.');
        this.navCtrl.navigateBack('/login');
      },
      error: async (error: any) => {
        this.isLoading = false;
        console.error('Error en registro:', error);

        let mensaje = 'No se pudo crear la cuenta.';

        if (error?.error?.detail) mensaje = error.error.detail;
        else if (error?.status === 409) mensaje = 'Este correo ya está registrado.';
        else if (error?.status === 422) mensaje = 'Datos inválidos. Revisa el correo o la contraseña.';
        else if (error?.status === 0) mensaje = 'No hay conexión con el servidor.';

        await this.mostrarAlerta('Error', mensaje);
      }
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  // Helper para alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}
