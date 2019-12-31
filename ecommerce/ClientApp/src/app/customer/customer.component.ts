import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent {
    public CustomerList: Customer[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Customer: Customer;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Customer[]>(this.BaseUrl + 'api/Customers')
            .subscribe(result => {
                this.CustomerList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));


    }

    public Cancel(form: NgForm) {
       
        if (form != null)
            form.resetForm();

         this.Customer = new Customer();
    }


    public SubmitCustomer(form: NgForm) {


        if (this.Customer.CustomerId == 0 ) {
            this.CreateCustomer(form);
        }
        else {
            this.UpdateCustomer(form);
        }
    }

    CreateCustomer(form: NgForm) {

        this.Http.post<Customer>(this.BaseUrl + 'api/Customers', this.Customer)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CustomerModal').modal('hide');
                this.Toastr.successToastr(result.CustomerName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateCustomer(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Customers/' + this.Customer.CustomerId, this.Customer)
            .subscribe(result => {
                let name = this.Customer.CustomerName;
                this.LoadList();
                this.Cancel(form);
                $('#CustomerModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetCustomer(id: number) {

        this.Http.get<Customer>(this.BaseUrl + 'api/Customers/' + id)
            .subscribe(result => {
                this.Customer = result;
                $('#CustomerModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Customer) {

        this.Customer = p;
        $('#deleteModal').modal('show');

    }


    public DeleteCustomer(id: number) {

        this.Http.delete<Customer>(this.BaseUrl + 'api/Customers/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.CustomerName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Customer {
    CustomerId: number = 0;
    CustomerName: string;
    Email: string;
    Address: string;
    ContactNumber: string;
    RecordDate: Date;


}
