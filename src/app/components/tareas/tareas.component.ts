import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/classes/proyecto.model';
import { Tarea } from 'src/app/classes/tarea.model';
import { Usuario } from 'src/app/classes/usuario.model';
import { JwtService } from 'src/app/services/jwt.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent {
  @Input()
  nombre:string;
  descripcion:string = "";
  tareas: Tarea[];
  newTarea: Tarea = new Tarea();
  usuarioActual : Usuario;
  user:Usuario;
  detallesTarea:Tarea = new Tarea();
  tareaAEditar:Tarea = new Tarea();
  usuarios:Usuario[]=[];
  usuarioEmailSelect:string[] = [];
  fechaFin:Date;
  estado:boolean;
  importancia:string;
  proyecto:Proyecto;
  proyectoId:number;
  proyectos:Proyecto[]=[];

  constructor(private tareaService: TareaService, private proyectoService:ProyectoService, private jwt: JwtService, private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuarioActual = this.jwt.checkToken();
    this.obtenerTareas();
    this.obtenerUsuarios();
    this.obtenerProyectos();
  }

  obtenerTareas() {
    this.tareaService.getTareasByUserId(this.usuarioActual.id).subscribe(
      (tareas: Tarea[]) => {
        this.tareas = tareas;
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuario().subscribe(
      (usuarios:Usuario[]) => {
        this.usuarios=usuarios;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  obtenerProyectos(){
    this.proyectoService.getProyectos().subscribe(
      (proyectos:Proyecto[]) => {
        this.proyectos=proyectos;
      },
      (error) => {
        console.error('Error al obtener los proyectos', error);
      }
    );
  }

  agregarTarea() {
    Swal.fire({
      title: "Vas a añadir una tarea",
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
        this.newTarea.id = 0;
        this.newTarea.descripcion = this.descripcion;
        this.newTarea.nombre = this.nombre;
        this.newTarea.fecha = new Date;
        this.newTarea.fechaFin = null;
        this.newTarea.estado = true;
        this.newTarea.importancia = this.importancia;
        this.proyectoService.getProyectoById(this.proyectoId).subscribe(
          (proyecto:Proyecto) => {
            this.newTarea.proyecto = proyecto;
            this.newTarea.usuarios = this.usuarioEmailSelect;
            this.tareaService.addTarea(this.newTarea).subscribe();
            this.addSuccess();
            this.nombre = "";
            this.descripcion = "";
            this.importancia = "";
          }
        );
      }
    });
  }

  verDetalles(id: number) {
    this.tareaService.getTareaById(id).subscribe(
      (tarea: Tarea) => {
        this.detallesTarea = tarea;
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  editarTarea(id: number) {
    this.tareaService.getTareaById(id).subscribe(
      (tarea: Tarea) => {
        this.tareaAEditar = tarea;
        this.tareaAEditar.usuarios = this.usuarioEmailSelect;
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
    this.proyectoService.getProyectoById(this.proyectoId).subscribe(
      (proyecto:Proyecto) => {
        this.tareaAEditar.proyecto=proyecto;
      },
      (error) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  guardarProyecto(id:number){
    Swal.fire({
      title: "Vas a editar una tarea",
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
        this.tareaService.updateTarea(this.tareaAEditar).subscribe();
        this.updateSuccess();
      }
    });
  }

  deleteTarea(id:number){
    Swal.fire({
      title: "Vas a eliminar una tarea",
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
        this.tareaService.deleteTarea(id).subscribe();
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
      this.obtenerTareas();
    })
  }

  addSuccess() {
    Swal.fire({
      title: 'Añadido correctamente',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.obtenerTareas();
    })
  }

  updateSuccess() {
    Swal.fire({
      title: 'Editado correctamente',
      icon: 'success',
      color: '#000000',
      background: '#FFFFFF',
    }).then(() => {
      this.obtenerTareas();
    })
  }

}
