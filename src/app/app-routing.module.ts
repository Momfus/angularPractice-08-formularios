import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';


const routes: Routes = [
  { path: 'template', component: TemplateComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'template' }


];

@NgModule({

  imports: [

    RouterModule.forRoot( routes ) // Defino que las rutas de mi proyecto es el arreglo routes declarado antes

  ],

  // Lo de abajo es para que se pueda usar en cualquier parte del proyecto
  exports: [

    RouterModule

  ]

})
export class AppRoutingModule { }
