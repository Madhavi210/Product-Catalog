import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { roleGuard } from 'src/app/core/guards/role.guard';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'adminDashboard/addProduct',
    component: AddProductComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'adminDashboard/addProduct/:id',
    component: AddProductComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'adminDashboard/addCategory',
    component: AddCategoryComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'adminDashboard/addCategory/:id',
    component: AddCategoryComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'adminDashboard/category',
    component: CategoryDetailComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {path :'**', component:PageNotFoundComponentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
