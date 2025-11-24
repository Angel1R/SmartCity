import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, mail, lockClosed, arrowForward, eye, eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss'], // Reusamos los estilos del Login para consistencia
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  showPassword = false;
  isLoading = false;

  constructor(private navCtrl: NavController) {
    addIcons({ person, mail, lockClosed, arrowForward, eye, eyeOff });
  }

  ngOnInit() { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.isLoading = true;
    // Simulación de registro
    setTimeout(() => {
      this.isLoading = false;
      // Al terminar, vamos al Tab 1 igual que en el login
      this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'forward' });
    }, 1500);
  }

  goToLogin() {
    // Volver al login con animación hacia atrás
    this.navCtrl.navigateBack('/login');
  }
}