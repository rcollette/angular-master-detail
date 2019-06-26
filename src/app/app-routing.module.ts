import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail/detail.component';
import { MasterComponent } from './master/master/master.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'master',
        component: MasterComponent,
        children: [
          {
            path: 'detail',
            component: DetailComponent
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
