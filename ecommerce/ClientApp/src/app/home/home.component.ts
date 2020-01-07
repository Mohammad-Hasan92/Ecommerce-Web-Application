//import { Component } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

    public ProductsList: Products[];

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Products: Products;
    


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Cancel(null);
        
    }
    public LoadList() {

        this.Http.get<Products[]>(this.BaseUrl + 'api/Products')
            .subscribe(result => {
                this.ProductsList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        

    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Products = new Products();
        
    }

    


}

class Products {
    ProductId: number = 0;
    ProductName: string;
    public Image: string = "";
    public Upload: File;
    public SubCatId: number;
    public BrandId: number;

    //Sizes: number[];
    //SizesValue: string;


}
