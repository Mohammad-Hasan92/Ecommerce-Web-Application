import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-purchaseviewmodel',
    templateUrl: './purchaseviewmodel.component.html'
})
export class PurchaseViewModelComponent {

    public PurchaseViewModel: PurchaseViewModel = new PurchaseViewModel();


    public ProductList: Product[] = new Array<Product>();
    public SizeList: Size[] = new Array<Size>();
    public SizeId: number;



    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Cancel(null);
    }


    public LoadList() {

        this.LoadProductList();
        this.LoadSizeList();

    }

    public LoadProductList() {

        this.Http.get<Product[]>(this.BaseUrl + 'api/Purchase/GetProduct')
            .subscribe(result => {
                this.ProductList = result;
            },
                error => this.Toastr.errorToastr(error, "Error"));
    }

    public LoadSizeList(productId: number = 0) {

        this.Http.get<Size[]>(this.BaseUrl + 'api/Purchase/GetSize/' + productId)
            .subscribe(result => {
                this.SizeList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    AddProduct() {
       
        let newPrd: PurchaseDetails = new PurchaseDetails();

        this.PurchaseViewModel.PurchaseDetails.push(newPrd);

        this.SizeList = this.SizeList;
    }
    CalculateGross() {
        let gross: number = 0;

         this.PurchaseViewModel.PurchaseDetails.map(r => r.TotalPrice = r.Quantity * r.unitPrice);
        this.PurchaseViewModel.PurchaseDetails.map(r => gross += r.TotalPrice);
        this.PurchaseViewModel.Purchase.PurchasePrice = gross;

    }
    RemoveProduct(p: PurchaseDetails) {
        let index: number = this.PurchaseViewModel.PurchaseDetails.lastIndexOf(p);
        this.PurchaseViewModel.PurchaseDetails.splice(index, 1);
    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();
    }






    public SubmitPurchase(form: NgForm) {

        this.Http.post<PurchaseViewModel>(this.BaseUrl + 'api/Purchase', this.PurchaseViewModel)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
               
                this.Toastr.successToastr(' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }



}



class PurchaseViewModel {

    public Purchase: Purchase;
    public PurchaseDetails: PurchaseDetails[];

    constructor() {

        this.Purchase = new Purchase();
        this.PurchaseDetails = new Array<PurchaseDetails>();
    }

}



class Size {
    public SizeId: number;
    public SizeValue: string;
}

class Product {
    public ProductId: number;
    public ProductName: string;
}

class Supplier {
    public SupplierId: number;
    public SupplierName: string;
}

class Purchase {
    PurchaseId: number = 0;
    PurchasePrice: number = 0;
    PurchaseDate: Date;
   


}

class PurchaseDetails {

    constructor() {

        this.ProductId = 1;
        this.SizeId = 1;
        this.Quantity = 0;
        this.unitPrice = 0;
        this.TotalPrice = 0;
    }


    PurchaseDetailId: number = 0;
    PurchaseId: number;
    ProductId: number;
    Quantity: number;
    unitPrice: number;
    SizeId: number;
    TotalPrice: number;
    

}



