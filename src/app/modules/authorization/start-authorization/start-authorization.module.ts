import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartAuthorizationRoutingModule } from './start-authorization-routing.module';
import {StartAuthorizationComponent} from "./start-authorization/start-authorization.component";
import {MaterialModule} from "../../material/material.module";
import {AppContextService} from "../../../services/app-context.service";


@NgModule({
  declarations: [
      StartAuthorizationComponent
  ],
    providers : [
    ],
  imports: [
    CommonModule,
    StartAuthorizationRoutingModule ,
      MaterialModule,
  ]
})
export class StartAuthorizationModule { }
