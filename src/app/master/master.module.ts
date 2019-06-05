import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MasterModule { }
