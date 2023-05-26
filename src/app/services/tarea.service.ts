import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../classes/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  url: String = "http://localhost:9098/tareas";

constructor(private http: HttpClient) { }

getTareasByUserId(id:number): Observable<Tarea[]> {
  return this.http.get<Tarea[]>(`${this.url}/user/` + id);
}

getTareaById(id:number): Observable<Tarea> {
  return this.http.get<Tarea>(`${this.url}/` + id);
}

getTareasByProyecto(id:number): Observable<Tarea[]> {
  return this.http.get<Tarea[]>(this.url+"/proyecto"+id);
}

getTareas(): Observable<Tarea[]> {
  return this.http.get<Tarea[]>(`${this.url}`);
}

addTarea(tarea: Tarea) {
  console.log(tarea.usuarios);

  return this.http.post(this.url+"", tarea);
}

updateTarea(tarea: Tarea){
  return this.http.put(this.url + "/" + tarea.id, tarea);
}

deleteTarea(id: number) {
  return this.http.delete(this.url + "/" + id);
}
}
