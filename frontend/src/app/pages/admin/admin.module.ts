import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { roleGuard } from 'src/app/core/guards/role.guard';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { PageNotFoundComponentComponent } from '../page-not-found-component/page-not-found-component.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddProductComponent,
    AddCategoryComponent,
    CategoryDetailComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  exports :[]
})
export class AdminModule { }
