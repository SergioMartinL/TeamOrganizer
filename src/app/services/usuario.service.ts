import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = "http://192.168.1.113:9098/usuarios";
  url2: String = "http://localhost:9098/usuarios";

  constructor(private http: HttpClient) { }

  loginUsuario(email: string, password: string): Observable<any> {
    const usuario = {
      email: email,
      password: password
    };
    return this.http.post(`${this.url}/login`, usuario, { responseType: "text" });
  }

  registerUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.url}/registro`, usuario);
  }

  getUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}`);
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Usuario>(`${this.url}/email`, { params: params });
  }

  addUsuario(usuario: Usuario) {
    return this.http.post(`${this.url}`, usuario);
  }

  updateUsuario(usuario: Usuario){
    return this.http.put(this.url + "/" + usuario.id, usuario);
  }

  deleteUsuarios(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
}
