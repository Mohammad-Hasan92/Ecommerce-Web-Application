import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html'
})
export class LogComponent {
    public LogList: Log[];
    public StocksList: Stocks[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Log: Log;
    public photoPreview: string | ArrayBuffer;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Log[]>(this.BaseUrl + 'api/Logs')
            .subscribe(result => {
                this.LogList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadStocksList();

    }


    public LoadStocksList() {

        this.Http.get<Stocks[]>(this.BaseUrl + 'api/Stocks')
            .subscribe(result => {
                this.StocksList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Log = new Log();
    }




    public SubmitLog(form: NgForm) {

        if (this.Log.LogId == 0) {
            this.CreateLog(form);
        }
        else {
            this.UpdateLog(form);
        }
    }

    CreateLog(form: NgForm) {

        this.Http.post<Log>(this.BaseUrl + 'api/Logs', this.Log)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(result.LogId + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateLog(form: NgForm) {

        this.Http.put(this.BaseUrl + 'api/Logs/' + this.Log.LogId, this.Log)
            .subscribe(result => {
                let name = this.Log.LogId;
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetLog(id: number) {

        this.Http.get<Log>(this.BaseUrl + 'api/Logs/' + id)
            .subscribe(result => {
                this.Log = result;
                $('#CategoryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Log) {

        this.Log = p;
        $('#deleteModal').modal('show');

    }


    public DeleteLog(id: number) {

        this.Http.delete<Log>(this.BaseUrl + 'api/Logs/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.LogId + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Log {
    LogId: number = 0;
    public BuyingPrice: number;
    public StockId: number;
    public ProfitPercantage: number;
    public SellingPrice: number;
    public Discount: number;
    public NetSellingPrice: number;
    ProductName: string;
    SizeValue: string;


}

interface Stocks {
    StockId: number;
    ProductId: number;
    SizeId: number;
    Quantity: number;
    UnitPrice: number;
    ProductName: string;
    SizeValue: string;


}
