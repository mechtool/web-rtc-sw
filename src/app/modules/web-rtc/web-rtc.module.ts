import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRtcRoutingModule } from './web-rtc-routing.module';
import { VideoMessageComponent } from './components/video-message/video-message.component';
import {MaterialModule} from "../material/material.module";
import {GeneralModule} from "../general/general.module";
import {WebRtcComponent} from "./web-rtc/web-rtc.component";
@NgModule({
  declarations: [
      WebRtcComponent,
      VideoMessageComponent
  ],
  imports: [
    CommonModule,
    WebRtcRoutingModule,
      MaterialModule,
      GeneralModule
  ]
})
export class WebRtcModule { }
