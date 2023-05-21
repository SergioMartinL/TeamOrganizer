import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.model';
import { JwtService } from 'src/app/services/jwt.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  borrarUsuario: boolean = false;
  usuario: Usuario;


  constructor(private loginService: UsuarioService, private router: Router,private jwt:JwtService) {}
  ngOnInit(){
    this.usuario = this.jwt.checkToken();
  }

  editarUsuario() {
    Swal.fire({
      title: "Vas a editar los campos",
      text: "¿Estás seguro?",
      icon: 'warning',
      color: '#000000',
      background: '#FFFFFF',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33000',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.updateUsuario(this.usuario).subscribe();
        localStorage.setItem('token', JSON.stringify(this.usuario))
        Swal.fire({
          title: 'Correcto',
          text: 'Campos editados correctamente',
          icon: 'success',
          color: '#000000',
          background: '#FFFFFF',
        }).then(() => {
          window.location.reload()
        })
      }});
  }

  darseBaja() {
    Swal.fire({
      title: "Vas a darte de baja",
      text: "Esta acción es irreversible ¿Estás seguro?",
      icon: 'warning',
      color: '#000000',
      background: '#FFFFFF',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33000',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.deleteUsuarios(this.usuario.id).subscribe();
        localStorage.setItem('token', "");
        Swal.fire({
          title: 'Correcto',
          text: 'Dado de baja correctamente',
          icon: 'success',
          color: '#000000',
          background: '#FFFFFF',
        }).then(()=>{
          window.location.reload();
        })
      }});
  }
}





