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

    public LogList: Log[];

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Log: Log;
    public CartVM: CartVM = new CartVM();
    


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Cancel(null);
        this.CartVM = new CartVM();
    }
    public LoadList() {

        this.Http.get<Log[]>(this.BaseUrl + 'api/Logs')
            .subscribe(result => {
                this.LogList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        
        this.Http.get<CartVM>(this.BaseUrl + 'api/Cart')
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Log = new Log();
        
    }


    ClearCart() {
        this.Http.get<CartVM>(this.BaseUrl + 'api/Cart/ClearCart')
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));

    }


    AddToCart(p: Log) {



        let newPrd: CartItem = new CartItem();

        newPrd.ProductId = p.ProductId;
        newPrd.Price = p.NetSellingPrice;
        newPrd.Qty = 1;
        //newPrd.Amount = newPrd.Price * newPrd.Qty;

        this.Http.post<CartVM>(this.BaseUrl + 'api/Cart', newPrd)
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));

        //this.CartVM.CartItems.push(newPrd);
    }

    RemoveFromCart(p: Log) {



        let newPrd: CartItem = new CartItem();

        newPrd.ProductId = p.ProductId;
        newPrd.Price = p.NetSellingPrice;
        newPrd.Qty = 1;
        //newPrd.Amount = newPrd.Price * newPrd.Qty;

        this.Http.post<CartVM>(this.BaseUrl + 'api/Cart/RemoveFromCart', newPrd)
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));

        //this.CartVM.CartItems.push(newPrd);
    }


    //CreateOrder(form: NgForm, formData: FormData) {

    //    this.Http.post<SubCategory>(this.BaseUrl + 'api/Products', formData)
    //        .subscribe(result => {
    //            this.LoadList();
    //            this.Cancel(form);
    //            $('#ProductsModal').modal('hide');
    //            this.Toastr.successToastr(result.SubCategoryName + ' create successfully', "Success");

    //        }, error => this.Toastr.errorToastr(error, "Error"));
    //}






}


class Log {
    LogId: number = 0;
    ProductName: string;
    public Image: string = "";
    public SellingPrice: number;
    public Discount: number;
    public NetSellingPrice: number;
    public BrandId: number;
    public ProductId: number = 0;
    //public Price: number = 200;

    //Sizes: number[];
    //SizesValue: string;


}

//class Products {
//    ProductId: number = 0;
//    ProductName: string;
//    public Image: string = "";
//    public SubCatId: number;
//    public BrandId: number;
//    public Price: number = 200;

//    //Sizes: number[];
//    //SizesValue: string;


//}
class CartVM {
    public Id: number = 0;
    public UserId: number = 0;
    public TotalItems: number = 0;
    public Total: number = 0;
    public CartItems: CartItem[] = new Array<CartItem>();
    
}

class CartItem {
    Id: number = 0;
    ProductId: number = 0;
    ProductName: string ;
    Qty: number = 0;
    Price: number = 0;
    Amount: number = 0;
}
