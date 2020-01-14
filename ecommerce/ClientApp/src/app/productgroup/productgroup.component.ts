import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-productgroup',
    templateUrl: './productgroup.component.html'
})
export class ProductGroupComponent {

    public ProductGroupList: ProductGroup[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public ProductGroup: ProductGroup;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<ProductGroup[]>(this.BaseUrl + 'api/ProductGroups')
            .subscribe(result => {
                this.ProductGroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));


    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.ProductGroup = new ProductGroup(); 
    }

    public SubmitGroup(form: NgForm) {


        if (this.ProductGroup.GroupId == 0) {
            this.CreateGroup(form);
        }
        else {
            this.UpdateGroup(form);
        }
    }

    CreateGroup(form: NgForm) {

        this.Http.post<ProductGroup>(this.BaseUrl + 'api/ProductGroups', this.ProductGroup)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(result.GroupName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateGroup(form: NgForm) {

        this.Http.put(this.BaseUrl + 'api/ProductGroups/' + this.ProductGroup.GroupId,this.ProductGroup)
            .subscribe(result => {
                let name = this.ProductGroup.GroupName;
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetGroup(id: number) {

        this.Http.get<ProductGroup>(this.BaseUrl + 'api/ProductGroups/' + id)
            .subscribe(result => {
                this.ProductGroup = result;
                $('#CategoryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: ProductGroup) {

        this.ProductGroup = p;
        $('#deleteModal').modal('show');

    }


    public DeleteCategory(id: number) {

        this.Http.delete<ProductGroup>(this.BaseUrl + 'api/ProductGroups/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.GroupName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class ProductGroup {
    GroupId: number = 0;
    GroupName: string;

}
