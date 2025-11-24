import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from 'rxjs'; // <--- Importante: interval y Subscription

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Tu URL de Render
  private apiUrl = 'https://smartcity-api-wlh9.onrender.com'; 
  
  // Variable para guardar el timer del Ping
  private pingSubscription: Subscription | null = null;

  constructor(private http: HttpClient) { }

  // 1. LOGIN
  login(credentials: { correo: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // 2. REGISTRO (Esta es la función que te faltaba)
  register(userData: { nombre: string, correo: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/`, userData);
  }

  // 3. KEEP ALIVE - INICIAR
  startKeepAlive() {
    console.log('Iniciando sistema Keep-Alive...');
    this.pingBackend(); // Primer ping inmediato

    // Ping cada 10 minutos (600,000 ms)
    this.pingSubscription = interval(600000).subscribe(() => {
      this.pingBackend();
    });
  }

  // 4. KEEP ALIVE - DETENER
  stopKeepAlive() {
    if (this.pingSubscription) {
      this.pingSubscription.unsubscribe();
    }
  }

  // Función privada auxiliar para hacer el ping
  private pingBackend() {
    const pingUrl = `${this.apiUrl}/ping`; 
    this.http.get(pingUrl).subscribe({
      next: (res) => console.log('❤️ Ping enviado al servidor:', res),
      error: (err) => console.error('⚠️ Error en ping (servidor posiblemente dormido):', err)
    });
  }
}