import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewMessageRoutingModule } from './new-message-routing.module';
import {NewMessageComponent} from "./new-message.component";
import {GeneralModule} from "../general/general.module";
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
      NewMessageComponent
  ],
  imports: [
    CommonModule,
    NewMessageRoutingModule,
      GeneralModule,
      MaterialModule,
      FlexLayoutModule,
  ]
})
export class NewMessageModule { }
