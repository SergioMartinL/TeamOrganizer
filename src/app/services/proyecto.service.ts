import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../classes/proyecto.model';
import { Tarea } from '../classes/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = "http://localhost:9098/proyectos";

  constructor(private http: HttpClient) { }

  getProyectosByUserId(id:number): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.url}/user/` + id);
  }

  getProyectoById(id:number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.url}/` + id);
  }

  getTareasByProyecto(id:number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url+"/"+id+"/tareas");
  }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.url}`);
  }

  addProyecto(proyecto: Proyecto) {
    return this.http.post(this.url+"", proyecto);
  }

  updateProyecto(proyecto: Proyecto){
    return this.http.put(this.url + "/" + proyecto.id, proyecto);
  }

  deleteProyecto(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
}
