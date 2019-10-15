import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {MaterialModule} from "../material/material.module";
import { SettingItemComponent } from './components/setting-item/setting-item.component';
import {ColorThemeComponent} from "./components/color-theme/color-theme.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ColorThemeService} from "../../services/color-theme.service";


@NgModule({
  declarations: [
      SettingsComponent,
      SettingItemComponent,
  ColorThemeComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
  ],
    providers : [
        ColorThemeService,
    ]
})
export class SettingsModule { }
