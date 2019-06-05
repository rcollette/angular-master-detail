import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [MasterComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MasterModule { }
