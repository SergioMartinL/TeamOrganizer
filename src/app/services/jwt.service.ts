import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../classes/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwt: JwtHelperService = new JwtHelperService();
  constructor() { }



  decodeToken(token:string){
   return this.jwt.decodeToken(token);
  }

  decodeUsuario(token:string){
    if (token) {
      let decoded = this.decodeToken(token);
      return new Usuario(decoded.id_usuario,"",decoded.nombre,decoded.apellidos,"");
    }else{
      return null;
    }
  }

  checkToken() {
    let token = localStorage.getItem('token');
    if (token !== "" || token !== undefined) {
      console.log(this.decodeUsuario(token));

      return this.decodeUsuario(token);
    }else{
      return null;
    }
  }
}


