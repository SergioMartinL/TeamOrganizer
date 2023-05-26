export class Proyecto {
  id:number;
  nombre:string;
  fecha:Date;
  descripcion:string;
  usuarios:string[];

  constructor(id: number = 0,nombre:string = "",fecha:Date = new Date() ,descripcion:string = "",usuarios:string[] = []){
  this.id=id;
  this.descripcion=descripcion;
  this.nombre=nombre;
  this.usuarios=usuarios;
  this.fecha=fecha;
  }
}
