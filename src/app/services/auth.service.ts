import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Usamos la URL de Render

  constructor(private http: HttpClient) { }

  // 1. POST: Enviar usuario y contraseña para iniciar sesión
  // NOTA: Asegúrate de que tu backend tenga un endpoint '/login' o ajusta la ruta aquí.
  login(credenciales: any): Observable<any> {
    // Si tu backend espera JSON:
    return this.http.post(`${this.apiUrl}/login`, credenciales);
    
    // Si tu backend usa OAuth2 form-data (muy común en FastAPI), avísame para cambiar esto.
  }

  // 2. GET: Obtener datos del usuario (Ejemplo para probar endpoint GET)
  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${userId}`);
  }
}