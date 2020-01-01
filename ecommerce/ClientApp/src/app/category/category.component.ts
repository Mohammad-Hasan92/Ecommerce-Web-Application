import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent {
    public CategoryList: Category[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Category: Category;
    public photoPreview: string | ArrayBuffer;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
        this.Cancel(null);
    }


    public LoadList() {

        this.Http.get<Category[]>(this.BaseUrl + 'api/Categories')
            .subscribe(result => {
                this.CategoryList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));


    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Category = new Category();
        this.photoPreview = null;
    }
    onFileChanged(event) {
        this.Category.Upload = event.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview 
        var mimeType = this.Category.Upload.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.Category.Upload);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }


    public SubmitCategory(form: NgForm) {


        if (this.Category.CatId == 0) {
            this.CreateCategory(form);
        }
        else {
            this.UpdateCategory(form);
        }
    }

    CreateCategory(form: NgForm) {

        this.Http.post<Category>(this.BaseUrl + 'api/Categories', this.Category)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(result.CategoryName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateCategory(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/Categories/' + this.Category.CatId, this.Category)
            .subscribe(result => {
                let name = this.Category.CategoryName;
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetCategory(id: number) {

        this.Http.get<Category>(this.BaseUrl + 'api/Categories/' + id)
            .subscribe(result => {
                this.Category = result;
                $('#CategoryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Category) {

        this.Category = p;
        $('#deleteModal').modal('show');

    }


    public DeleteCategory(id: number) {

        this.Http.delete<Category>(this.BaseUrl + 'api/Categories/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.CategoryName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Category {
    CatId: number = 0;
    CategoryName: string;
    RecordDate: Date;
    public Image: string = '';
    public Upload: File;


}
