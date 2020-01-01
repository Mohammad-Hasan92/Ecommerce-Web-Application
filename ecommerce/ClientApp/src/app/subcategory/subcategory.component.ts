import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-subcategory',
    templateUrl: './subcategory.component.html'
})
export class SubCategoryComponent {
    public SubCategoryList: SubCategory[];
    public CategoryList: Category[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public SubCategory: SubCategory;
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

        this.Http.get<SubCategory[]>(this.BaseUrl + 'api/SubCategories')
            .subscribe(result => {
                this.SubCategoryList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadCategoryList();

    }


    public LoadCategoryList() {

        this.Http.get<Category[]>(this.BaseUrl + 'api/Categories')
            .subscribe(result => {
                this.CategoryList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }



    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.SubCategory = new SubCategory();
        this.photoPreview = null;
    }
    onFileChanged(event) {
        this.SubCategory.Upload = event.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview 
        var mimeType = this.SubCategory.Upload.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.SubCategory.Upload);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }


    public SubmitSubCategory(form: NgForm) {


        if (this.SubCategory.SubCatId == 0) {
            this.CreateSubCategory(form);
        }
        else {
            this.UpdateSubCategory(form);
        }
    }

    CreateSubCategory(form: NgForm) {

        this.Http.post<SubCategory>(this.BaseUrl + 'api/SubCategories', this.SubCategory)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(result.SubCategoryName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateSubCategory(form: NgForm) {



        this.Http.put(this.BaseUrl + 'api/SubCategories/' + this.SubCategory.SubCatId, this.SubCategory)
            .subscribe(result => {
                let name = this.SubCategory.SubCategoryName;
                this.LoadList();
                this.Cancel(form);
                $('#CategoryModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetCategory(id: number) {

        this.Http.get<SubCategory>(this.BaseUrl + 'api/SubCategories/' + id)
            .subscribe(result => {
                this.SubCategory = result;
                $('#CategoryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: SubCategory) {

        this.SubCategory = p;
        $('#deleteModal').modal('show');

    }


    public DeleteCategory(id: number) {

        this.Http.delete<SubCategory>(this.BaseUrl + 'api/SubCategories/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.SubCategoryName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class SubCategory {
    SubCatId: number = 0;
    SubCategoryName: string;
    public Image: string = "";
    public Upload: File;
    public CatId: number;


}

interface Category {
    CatId: number;
    CategoryName: string;

}
