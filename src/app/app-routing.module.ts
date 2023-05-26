import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardGuard } from './security/auth-guard.guard';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TareasComponent } from './components/tareas/tareas.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'profile',component: PerfilComponent, canActivate: [AuthGuardGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'proyectos', component:ProyectosComponent, canActivate:[AuthGuardGuard]},
  {path: 'tareas',component: TareasComponent, canActivate:[AuthGuardGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
