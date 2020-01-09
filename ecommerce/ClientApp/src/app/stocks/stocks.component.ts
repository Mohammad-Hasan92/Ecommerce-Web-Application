import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html'
})
export class StocksComponent {
    public StocksList: Stocks[];
    public ProductsList: Products[];
    public SizesList: Sizes[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Stocks: Stocks;
    


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Stocks[]>(this.BaseUrl + 'api/Stocks')
            .subscribe(result => {
                this.StocksList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadProductsList();
        this.LoadSizesList();

    }


    public LoadProductsList() {

        this.Http.get<Products[]>(this.BaseUrl + 'api/Products')
            .subscribe(result => {
                this.ProductsList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public LoadSizesList() {

        this.Http.get<Sizes[]>(this.BaseUrl + 'api/Sizes')
            .subscribe(result => {
                this.SizesList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Stocks = new Stocks();
        
    }
   


    public SubmitStocks(form: NgForm) {

        this.Stocks.Quantity = Number(this.Stocks.Quantity);

        if (this.Stocks.StockId == 0) {
            this.CreateStocks(form);
        }
        else {
            this.UpdateStocks(form);
        }
    }

    CreateStocks(form: NgForm) {

        this.Http.post<Stocks>(this.BaseUrl + 'api/Stocks', this.Stocks)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#StocksModal').modal('hide');
                this.Toastr.successToastr('Stock create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateStocks(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Stocks/' + this.Stocks.StockId, this.Stocks)
            .subscribe(result => {
                //let name = this.Products.ProductName;
                this.LoadList();
                this.Cancel(form);
                $('#StocksModal').modal('hide');
                this.Toastr.successToastr('Stock updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetStocks(id: number) {

        this.Http.get<Stocks>(this.BaseUrl + 'api/Stocks/' + id)
            .subscribe(result => {
                this.Stocks = result;
                $('#StocksModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Stocks) {

        this.Stocks = p;
        $('#deleteModal').modal('show');

    }


    public DeleteStocks(id: number) {

        this.Http.delete<Stocks>(this.BaseUrl + 'api/Stocks/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr('Stock deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Stocks {
    StockId: number = 0;
    Quantity: number = 0;
    UnitPrice: number = 0;
    public ProductId: number;
    public SizeId: number;
    ProductName: string;
    SizeValue: string;


}

class Products {
    ProductId: number;
    ProductName: string;

}

class Sizes {
    SizeId: number;
    SizeValue: string;

}
