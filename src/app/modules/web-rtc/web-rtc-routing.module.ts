import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebRtcComponent} from "./web-rtc/web-rtc.component";


const routes: Routes = [
    {path : '', component : WebRtcComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRtcRoutingModule { }
