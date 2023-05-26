import { Proyecto } from "./proyecto.model";

export class Tarea {
  id:number;
  nombre:string;
  importancia:string;
  descripcion:string;
  fecha:Date;
  fechaFin:Date;
  proyecto:Proyecto;
  usuarios:string[];
  estado:boolean;

  constructor(id: number = 0,nombre:string = "",proyecto:Proyecto = new Proyecto(), estado:boolean = false, importancia:string ="", fechaFin:Date = new Date(),fecha:Date = new Date() ,descripcion:string = "",usuarios:string[] = []){
  this.id=id;
  this.descripcion=descripcion;
  this.nombre=nombre;
  this.usuarios=usuarios;
  this.estado=estado;
  this.fechaFin=fechaFin;
  this.fecha=fecha;
  this.importancia=importancia;
  this.proyecto=proyecto;
  }
}
