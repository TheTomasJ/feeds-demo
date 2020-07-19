import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'feeds',
        loadChildren: () => import('./views/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'feeds/:id',
        loadChildren: () => import('./views/detail/detail.module').then(m => m.DetailModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
