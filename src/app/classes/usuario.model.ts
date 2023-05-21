export class Usuario {
  id:number;
  password:string;
  nombre:string;
  apellidos:string;
  email:string;

  constructor(id: number = 0,password:string = "",nombre:string = "",apellidos:string = "",email:string = ""){
  this.id=id
  this.password=password
  this.nombre=nombre
  this.apellidos=apellidos
  this.email=email
  }
}
