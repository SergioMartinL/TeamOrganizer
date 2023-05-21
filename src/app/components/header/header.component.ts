import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.model';
import { JwtService } from 'src/app/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router,private jwt: JwtService){}

  usuario: Usuario;

  ngOnInit(){
      this.usuario = this.jwt.checkToken();
  }

  logout(){
    Swal.fire({
      title: "Vas a cerrar la sesión",
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
        localStorage.setItem("token","");
        this.router.navigateByUrl("/");
        Swal.fire({
          title:'Sesión finalizada',
          icon:'success',
          color: '#000000',
          background: '#FFFFFF',
        }).then(() =>{
          window.location.reload();
        })
      }
    });
  }
}
