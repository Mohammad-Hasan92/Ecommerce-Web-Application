import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html'
})
export class BrandComponent {
    public BrandList: Brand[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Brand: Brand;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Brand[]>(this.BaseUrl + 'api/Brands')
            .subscribe(result => {
                this.BrandList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));


    }

    public Cancel(form: NgForm) {
       
        if (form != null)
            form.resetForm();

         this.Brand = new Brand();
    }


    public SubmitBrand(form: NgForm) {


        if (this.Brand.BrandId == 0 ) {
            this.CreateBrand(form);
        }
        else {
            this.UpdateBrand(form);
        }
    }

    CreateBrand(form: NgForm) {

        this.Http.post<Brand>(this.BaseUrl + 'api/Brands', this.Brand)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#BrandModal').modal('hide');
                this.Toastr.successToastr(result.BrandName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateBrand(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Brands/' + this.Brand.BrandId, this.Brand)
            .subscribe(result => {
                let name = this.Brand.BrandName;
                this.LoadList();
                this.Cancel(form);
                $('#BrandModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetBrand(id: number) {

        this.Http.get<Brand>(this.BaseUrl + 'api/Brands/' + id)
            .subscribe(result => {
                this.Brand = result;
                $('#BrandModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Brand) {

        this.Brand = p;
        $('#deleteModal').modal('show');

    }


    public DeleteBrand(id: number) {

        this.Http.delete<Brand>(this.BaseUrl + 'api/Brands/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.BrandName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Brand {
    BrandId: number = 0;
    BrandName: string;
    RecordDate: Date;


}
