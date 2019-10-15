import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsCodeRoutingModule } from './sms-code-routing.module';
import {SmsCodeComponent} from "./sms-code/sms-code.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AppContextService} from "../../../services/app-context.service";


@NgModule({
  declarations: [
      SmsCodeComponent
  ],
    providers : [
    ],
  imports: [
    CommonModule,
    SmsCodeRoutingModule ,
      MaterialModule,
      ReactiveFormsModule,
  ]
})
export class SmsCodeModule { }
