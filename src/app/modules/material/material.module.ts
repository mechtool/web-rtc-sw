import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from "@angular/material";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatSelectModule,
      MatTooltipModule,
      MatButtonModule,
      MatInputModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatTabsModule,
      MatBadgeModule,
      MatMenuModule,
      MatAutocompleteModule,
  ],
    exports : [
      MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatSelectModule,
	MatTooltipModule,
	MatButtonModule,
	MatInputModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatTabsModule,
	MatBadgeModule,
	MatMenuModule,
	MatAutocompleteModule,
    ]
})
export class MaterialModule { }
