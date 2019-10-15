import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactComponent} from "./contact/contact.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {MaterialModule} from "../material/material.module";
import { PhoneControlComponent } from './phone-control/phone-control.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContactSearchComponent } from './contact-search/contact-search.component';

@NgModule({
  declarations: [
      ContactComponent,
      NotificationsComponent,
      PhoneControlComponent,
      ContactSearchComponent,
  ],
    exports : [
	ContactComponent,
	NotificationsComponent,
	PhoneControlComponent,
	ContactSearchComponent,
    ],
    providers : [
    ],
  imports: [
    CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
  ]
})
export class GeneralModule { }
