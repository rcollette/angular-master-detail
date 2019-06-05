import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetailModule {
}
