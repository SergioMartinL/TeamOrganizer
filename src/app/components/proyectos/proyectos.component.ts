import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/services/jwt.service';
import { Proyecto } from 'src/app/classes/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/classes/tarea.model';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  @Input()
  nombre:string = "";
  descripcion:string = "";
  proyectos: Proyecto[] = [];
  newProyecto: Proyecto = new Proyecto();
  usuarioActual : Usuario;
  user:Usuario;
  detallesProyecto:Proyecto = new Proyecto();
  proyectoAEditar:Proyecto = new Proyecto();
  tareas:Tarea[] = [];
  usuarios:Usuario[] = [];
  usuarioEmailSelect:string[];

  constructor(private proyectoService: ProyectoService, private jwt: JwtService, private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioActual = this.jwt.checkToken();
    this.obtenerProyectos();
    this.obtenerUsuarios();
  }

  obtenerProyectos() {
    this.proyectoService.getProyectosByUserId(this.usuarioActual.id).subscribe(
      (proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
      },
      (error) => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuario().subscribe(
      (usuarios:Usuario[]) => {
        this.usuarios=usuarios;
      },
      (error) => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  obtenerTareasProyecto(id:number){
    this.proyectoService.getTareasByProyecto(id).subscribe(
      (tareas: Tarea[]) => {
        this.tareas = tareas;
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  agregarProyecto() {
    Swal.fire({
      title: "Vas a añadir un proyecto",
      text: "¿Estás seguro?",
      icon: 'info',
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
        this.newProyecto.id = 0;
        this.newProyecto.descripcion = this.descripcion;
        this.newProyecto.nombre = this.nombre;
        this.newProyecto.fecha = new Date;
        this.usuarioService.getUsuarioById(this.usuarioActual.id).subscribe(
          (usuario: Usuario) => {
            this.newProyecto.usuarios = this.usuarioEmailSelect;
            this.proyectoService.addProyecto(this.newProyecto).subscribe();
            this.addSuccess();
            this.nombre = "";
            this.descripcion = "";
          },
          (error) => {
            console.error('Error al obtener los proyectos', error);
          }
        );
      }
    });
  }

  verDetalles(id: number) {
    this.proyectoService.getProyectoById(id).subscribe(
      (proyecto: Proyecto) => {
        this.detallesProyecto = proyecto;
      },
      (error) => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  editarProyecto(id: number) {
    this.proyectoService.getProyectoById(id).subscribe(
      (proyecto: Proyecto) => {
        this.proyectoAEditar = proyecto;
        this.proyectoAEditar.usuarios = this.usuarioEmailSelect;
      },
      (error) => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  guardarProyecto(id:number){
    Swal.fire({
      title: "Vas a editar un proyecto",
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
        this.proyectoService.updateProyecto(this.proyectoAEditar).subscribe();
        this.updateSuccess();
      }
    });
  }

  deleteProyecto(id:number){
    Swal.fire({
      title: "Vas a eliminar un proyecto",
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
        this.proyectoService.deleteProyecto(id).subscribe();
        this.deleteSuccess();
      }
    });
  }

  deleteSuccess() {
    Swal.fire({
      title: 'Eliminación realizada',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.obtenerProyectos();
    })
  }

  addSuccess() {
    Swal.fire({
      title: 'Añadido correctamente',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.obtenerProyectos();
    })
  }

  updateSuccess() {
    Swal.fire({
      title: 'Editado correctamente',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.obtenerProyectos();
    })
  }
}
