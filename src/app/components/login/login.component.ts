
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  @Input()
  email: boolean | string
  register: boolean = false;
  showError: boolean = false;
  userLogged: Usuario = new Usuario();
  newUser: Usuario = new Usuario();
  errorLogin: string = ""
  emailLogin: string = ""
  passwdLogin: string = ""
  checkPasswd: string = ""
  registerBtn: HTMLElement = document.getElementById("registerBtn");

  constructor(private loginService: UsuarioService, private router: Router, private jwt: JwtService) { }


  login() {
    this.loginService.loginUsuario(this.emailLogin, this.passwdLogin).subscribe({
      next: data => {
        localStorage.setItem("token", data);
        this.userLogged = this.jwt.checkToken()
        if (this.userLogged != null) {
          this.logSuccess();
        }
      },
      error: error => {
        this.errorLogin = "Credenciales inválidas";
        console.log(error);
      }
    })
  }

  registerNewUser() {
    if (this.newUser.password == this.checkPasswd) {
      this.loginService.registerUsuario(this.newUser).subscribe({
        next: data => {
          this.loginService.loginUsuario(this.newUser.email, this.newUser.password).subscribe({
            next: data => {
              localStorage.setItem("token", data);
              this.userLogged = this.jwt.checkToken()
              if (this.userLogged != null) {
                this.registerSuccess();
              }
            },
            error: error => {
              this.errorLogin = "Credenciales inválidas";
              console.log(error);
            }
          })
        },
        error: error => {
          this.showError = true;
          this.errorLogin = "Las contraseñas no coinciden"
          console.log(error);
        }
      })
    }

  }
  logSuccess() {
    Swal.fire({
      title: 'Sesión iniciada',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.router.navigateByUrl("/");
    }
    ).then(() => {
      window.location.reload();
    })
  }

  registerSuccess() {
    Swal.fire({
      title: 'Registrado con éxito',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.router.navigateByUrl("/");
    }
    ).then(() => {
      window.location.reload();
    })
  }

  validator() {
    if (this.newUser.nombre != "" && this.newUser.apellidos != "" && this.newUser.email != "" && this.newUser.password != "") {
      this.registerNewUser();
    } else {
      this.showError = true;
      this.errorLogin = "Se debe rellenar todos los campos"
    }
  }
}
