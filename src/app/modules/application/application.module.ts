import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application/application.component';
import {GeneralModule} from "../general/general.module";
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
      ApplicationComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
      GeneralModule,
      MaterialModule,
      FlexLayoutModule,
  ]
})
export class ApplicationModule { }
