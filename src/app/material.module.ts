import { NgModule } from "@angular/core";

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatIconModule,
  ],
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatIconModule,
  ]
})

export class MaterialModule {}
