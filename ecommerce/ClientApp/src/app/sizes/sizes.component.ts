import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-sizes',
    templateUrl: './sizes.component.html'
})
export class SizesComponent {
    public SizesList: Sizes[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Sizes: Sizes;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Sizes[]>(this.BaseUrl + 'api/Sizes')
            .subscribe(result => {
                this.SizesList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));


    }

    public Cancel(form: NgForm) {
       
        if (form != null)
            form.resetForm();

         this.Sizes = new Sizes();
    }


    public SubmitSizes(form: NgForm) {


        if (this.Sizes.SizeId == 0 ) {
            this.CreateSizes(form);
        }
        else {
            this.UpdateSizes(form);
        }
    }

    CreateSizes(form: NgForm) {

        this.Http.post<Sizes>(this.BaseUrl + 'api/Sizes', this.Sizes)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#SizesModal').modal('hide');
                this.Toastr.successToastr(result.SizeValue + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateSizes(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Sizes/' + this.Sizes.SizeId, this.Sizes)
            .subscribe(result => {
                let name = this.Sizes.SizeValue;
                this.LoadList();
                this.Cancel(form);
                $('#SizesModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetSizes(id: number) {

        this.Http.get<Sizes>(this.BaseUrl + 'api/Sizes/' + id)
            .subscribe(result => {
                this.Sizes = result;
                $('#SizesModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Sizes) {

        this.Sizes = p;
        $('#deleteModal').modal('show');

    }


    public DeleteSizes(id: number) {

        this.Http.delete<Sizes>(this.BaseUrl + 'api/Sizes/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.SizeValue + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Sizes {
    SizeId: number = 0;
    SizeValue: string;
    
    


}
