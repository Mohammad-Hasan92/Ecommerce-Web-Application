import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-suppliers',
    templateUrl: './suppliers.component.html'
})
export class SuppliersComponent {
    public SuppliersList: Suppliers[];
    public BrandList: Brand[];

 


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Suppliers: Suppliers;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }
    public LoadList() {

        this.Http.get<Suppliers[]>(this.BaseUrl + 'api/Suppliers')
            .subscribe(result => {
                this.SuppliersList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadBrandList();
        
    }

    public LoadBrandList() {

        this.Http.get<Brand[]>(this.BaseUrl + 'api/Brands')
            .subscribe(result => {
                this.BrandList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public Cancel(form: NgForm) {
       
        if (form != null)
            form.resetForm();

         this.Suppliers = new Suppliers();
    }


    public SubmitSuppliers(form: NgForm) {


        if (this.Suppliers.SupplierId == 0 ) {
            this.CreateSuppliers(form);
        }
        else {
            this.UpdateSuppliers(form);
        }
    }

    CreateSuppliers(form: NgForm) {

        this.Http.post<Suppliers>(this.BaseUrl + 'api/Suppliers', this.Suppliers)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#SuppliersModal').modal('hide');
                this.Toastr.successToastr(result.SupplierName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateSuppliers(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Suppliers/' + this.Suppliers.SupplierId, this.Suppliers)
            .subscribe(result => {
                let name = this.Suppliers.SupplierName;
                this.LoadList();
                this.Cancel(form);
                $('#SuppliersModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetSuppliers(id: number) {

        this.Http.get<Suppliers>(this.BaseUrl + 'api/Suppliers/' + id)
            .subscribe(result => {
                this.Suppliers = result;
                $('#SuppliersModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Suppliers) {

        this.Suppliers = p;
        $('#deleteModal').modal('show');

    }


    public DeleteSuppliers(id: number) {

        this.Http.delete<Suppliers>(this.BaseUrl + 'api/Suppliers/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.SupplierName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Suppliers {
    SupplierId: number = 0;
    SupplierName: string;
    Address: string;
    ContactNumber: string;
    Brands: number[];
    BrandNames: string;
    RecordDate: Date;
}

class Brand {

    BrandId: number = 0;
    BrandName: string;
}




