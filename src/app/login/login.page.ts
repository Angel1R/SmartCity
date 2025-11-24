import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
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

  showPassword = false;
  isLoading = false;

  constructor(private navCtrl: NavController) {
    addIcons({ person, lockClosed, logIn, eye, eyeOff, flash });
  }

  ngOnInit() { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'forward' });
    }, 1500);
  }

  // Función para ir al registro
  goToRegister() {
    this.navCtrl.navigateForward('/register', { animated: true, animationDirection: 'forward' });
  }

}