import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html'
})
export class WishListComponent {
    public WishListed: WishList[];
    public ProductList: Products[];
    public CustomerList: Customers[];

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public WishList: WishList;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }
    public LoadList() {

        this.Http.get<WishList[]>(this.BaseUrl + 'api/WishLists')
            .subscribe(result => {
                this.WishListed = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadProductList();
        this.LoadCustomerList();

    }

    public LoadProductList() {

        this.Http.get<Products[]>(this.BaseUrl + 'api/Products')
            .subscribe(result => {
                this.ProductList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }
    public LoadCustomerList() {

        this.Http.get<Customers[]>(this.BaseUrl + 'api/Customers')
            .subscribe(result => {
                this.CustomerList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.WishList = new WishList();
    }


    public SubmitWishList(form: NgForm) {


        if (this.WishList.WishListId == 0) {
            this.CreateWishList(form);
        }
        else {
            this.UpdateWishList(form);
        }
    }

    CreateWishList(form: NgForm) {

        this.Http.post<WishList>(this.BaseUrl + 'api/WishLists', this.WishList)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#WishListModal').modal('hide');
                this.Toastr.successToastr(result.WishListId + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateWishList(form: NgForm) {
        this.Http.put(this.BaseUrl + 'api/WishLists/' + this.WishList.WishListId, this.WishList)
            .subscribe(result => {
                let name = this.WishList.WishListId;
                this.LoadList();
                this.Cancel(form);
                $('#WishListModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetWishList(id: number) {

        this.Http.get<WishList>(this.BaseUrl + 'api/WishLists/' + id)
            .subscribe(result => {
                this.WishList = result;
                $('#WishListModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: WishList) {

        this.WishList = p;
        $('#deleteModal').modal('show');

    }


    public DeleteWishList(id: number) {

        this.Http.delete<WishList>(this.BaseUrl + 'api/WishLists/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.WishListId + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class WishList {
    WishListId: number = 0;
    ProductId: number;
    CustomerId: number;
    Date: Date;
}

interface Products {

    ProductId: number;
    ProductName: string;
}
interface Customers {

    CustomerId: number;
    CustomerName: string;
}




