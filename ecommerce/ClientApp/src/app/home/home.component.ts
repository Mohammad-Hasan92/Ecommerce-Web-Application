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

    public OrderViewModel: OrderViewModel = new OrderViewModel();
    


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


    public ClearCart() {
        this.Http.get<CartVM>(this.BaseUrl + 'api/Cart/ClearCart')
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));

    }


    AddToCart(p: Log) {



        let newPrd: CartItem = new CartItem();

        newPrd.ProductId = p.ProductId;
        newPrd.Price = p.NetSellingPrice;
        newPrd.ProductName = p.ProductName;
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
        newPrd.ProductName = p.ProductName;
        newPrd.Qty = 1;
        //newPrd.Amount = newPrd.Price * newPrd.Qty;

        this.Http.post<CartVM>(this.BaseUrl + 'api/Cart/RemoveFromCart', newPrd)
            .subscribe(result => {
                this.CartVM = result;
            }, error => this.Toastr.errorToastr(error, "Error"));

        //this.CartVM.CartItems.push(newPrd);
    }


    CreateOrder() {

        this.Http.post<OrderViewModel>(this.BaseUrl + 'api/Order', this.CartVM)
            .subscribe(result => {
                this.LoadList(); 
                $('#CartModal').modal('hide');
                this.Toastr.successToastr('Order take successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }






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

class OrderViewModel {
    public orders: Orders;
    public OrdersDetails: OrdersDetails[];


    constructor() {

        this.orders = new Orders();
        this.OrdersDetails = new Array<OrdersDetails>();
    }
}


class OrdersDetails {
    OrderDetailsId: number = 0;
    OrdersId: number = 0;
    ProductId: number = 0;
    UnitPrice: number = 0;
    Quantity: number = 0;
    TotalPrice: number = 0;
}

class Orders{
    OrderId: number = 0;
    CustomerId: number = 0;
    GrandTotal: number = 0;
    Discount: number = 0;
    NetPrice: number = 0;
}
