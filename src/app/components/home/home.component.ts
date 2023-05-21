import { Component } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario.model';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  usuario: Usuario = null;

  constructor(private jwt: JwtService) { }

  ngOnInit() {
    this.usuario = this.jwt.checkToken();
  }
}
