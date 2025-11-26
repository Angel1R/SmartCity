import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, lockClosed, logIn, eye, eyeOff, flash } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  correo = '';
  contrasena = '';

  showPassword = false;
  isLoading = false;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    addIcons({ person, lockClosed, logIn, eye, eyeOff, flash });
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.correo || !this.contrasena) {
      console.log('Faltan datos');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      // ahora sí funciona
      this.router.navigate(['/tabs/tab1']);
      
    }, 1200);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
