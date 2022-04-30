import { NgModule } from "@angular/core";

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule
  ]
})

export class MaterialModule {}
