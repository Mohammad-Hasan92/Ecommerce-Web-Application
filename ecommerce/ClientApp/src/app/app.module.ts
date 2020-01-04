import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { BrandComponent } from './brand/brand.component';
import { CustomerComponent } from './customer/customer.component';
import { SizesComponent } from './sizes/sizes.component';
import { CategoryComponent } from './category/category.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SubCategoryComponent } from './subcategory/subcategory.component';
import { ProductsComponent } from './products/products.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { StocksComponent } from './stocks/stocks.component';
import { CommentsComponent } from './comments/comments.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';

import { MatButtonModule } from '@angular/material/button';

import {MatDatepickerModule} from '@angular/material/datepicker';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import {MatInputModule} from '@angular/material/input';
import { MaterialModule } from './material/material.component';






@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        CounterComponent,
        FetchDataComponent,
        BrandComponent,
        CustomerComponent,
        SizesComponent,
        CategoryComponent,
        SuppliersComponent,
        SubCategoryComponent,
        ProductsComponent,
        WishListComponent,
        StocksComponent,
        CommentsComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ApiAuthorizationModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        NgxPrintModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDatepickerModule,
        MaterialModule,
        MatInputModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'counter', component: CounterComponent },
            { path: 'brand', component: BrandComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'sizes', component: SizesComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'suppliers', component: SuppliersComponent },
            { path: 'subcategory', component: SubCategoryComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'wishlist', component: WishListComponent },
            { path: 'stocks', component: StocksComponent },
            { path: 'comments', component: CommentsComponent },
            { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
        ])
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
