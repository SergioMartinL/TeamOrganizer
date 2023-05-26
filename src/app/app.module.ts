import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './components/perfil/perfil.component';
import { JwtService } from './services/jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.interceptor';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { TareasComponent } from './components/tareas/tareas.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    TareasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    SelectButtonModule,
    CommonModule
  ],
  providers: [
        {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
        },
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
