import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardGuard } from './security/auth-guard.guard';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'profile',component: PerfilComponent, canActivate: [AuthGuardGuard]},
  {path: 'login',component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
