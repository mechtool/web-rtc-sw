import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import {PasswordComponent} from "./password/password.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      PasswordComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
  ]
})
export class PasswordModule { }
