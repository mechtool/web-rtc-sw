import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import {AuthorizationPageComponent} from "./authorization/authorization-page/authorization-page.component";


@NgModule({
  declarations: [
      AuthorizationPageComponent,
  ],
    providers : [
    ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule ,
  ]
})
export class AuthorizationModule { }
