import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent {
    public CommentList: Comments[];
    public ProductList: Products[];
    public CustomerList: Customers[];

    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;

    public Comments: Comments;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }
    public LoadList() {

        this.Http.get<Comments[]>(this.BaseUrl + 'api/Comments')
            .subscribe(result => {
                this.CommentList = result;
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

        this.Comments = new Comments();
    }


    public SubmitComments(form: NgForm) {


        if (this.Comments.CommentId == 0) {
            this.CreateComments(form);
        }
        else {
            this.UpdateComments(form);
        }
    }

    CreateComments(form: NgForm) {

        this.Http.post<Comments>(this.BaseUrl + 'api/Comments', this.Comments)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CommentsModal').modal('hide');
                this.Toastr.successToastr(result.CommentId + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateComments(form: NgForm) {
        this.Http.put(this.BaseUrl + 'api/Comments/' + this.Comments.CommentId, this.Comments)
            .subscribe(result => {
                let name = this.Comments.CommentId;
                this.LoadList();
                this.Cancel(form);
                $('#CommentsModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetComments(id: number) {

        this.Http.get<Comments>(this.BaseUrl + 'api/Comments/' + id)
            .subscribe(result => {
                this.Comments = result;
                $('#CommentsModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Comments) {

        this.Comments = p;
        $('#deleteModal').modal('show');

    }


    public DeleteComments(id: number) {

        this.Http.delete<Comments>(this.BaseUrl + 'api/Comments/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.CommentId + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Comments {
    CommentId: number = 0;
    ProductId: number;
    CustomerId: number;
    CommentText: string;
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




