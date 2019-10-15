import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path : 'authorization', loadChildren : ()=> import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule)},
    {path : 'application' , loadChildren :  () => import('./modules/application/application.module').then(m => m.ApplicationModule)},
    {path : '', pathMatch :'full', redirectTo : 'authorization'} ,
    {path : '**', pathMatch :'full', redirectTo : 'authorization'} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
