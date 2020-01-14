import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent {
    public ProductsList: Products[];
    public SubCategoryList: SubCategory[];
    public BrandList: Brand[];
    public ProductGroupList: ProductGroup[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Products: Products;
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

        this.Http.get<Products[]>(this.BaseUrl + 'api/Products')
            .subscribe(result => {
                this.ProductsList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.LoadSubCategoryList();
        this.LoadBrandList();
        this.LoadProductGroupList();

    }


    public LoadSubCategoryList() {

        this.Http.get<SubCategory[]>(this.BaseUrl + 'api/SubCategories')
            .subscribe(result => {
                this.SubCategoryList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public LoadBrandList() {

        this.Http.get<Brand[]>(this.BaseUrl + 'api/Brands')
            .subscribe(result => {
                this.BrandList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public LoadProductGroupList() {

        this.Http.get<ProductGroup[]>(this.BaseUrl + 'api/ProductGroups')
            .subscribe(result => {
                this.ProductGroupList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public Cancel(form: NgForm) {

        if (form != null)
            form.resetForm();

        this.Products = new Products();
        this.photoPreview = null;
    }
    onFileChanged(event) {
        this.Products.Upload = event.target.files[0];
        this.preview();
    }

    preview() {
        // Show preview 
        var mimeType = this.Products.Upload.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.Products.Upload);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }


    public SubmitProducts(form: NgForm) {


        const formData = new FormData();

        formData.append('ProductId', this.Products.ProductId.toString());
        formData.append('ProductName', this.Products.ProductName);
        formData.append('Image', this.Products.Image);
        formData.append('Upload', this.Products.Upload, this.Products.Upload.name);
        formData.append('SubCatId', this.Products.SubCatId.toString());
        formData.append('GroupId', this.Products.GroupId.toString());
        formData.append('BrandId', this.Products.BrandId.toString());



        if (this.Products.ProductId == 0) {
            this.CreateProducts(form, formData);
        }
        else {
            this.UpdateProducts(form, formData);
        }
    }

    CreateProducts(form: NgForm, formData:FormData) {

        this.Http.post<SubCategory>(this.BaseUrl + 'api/Products', formData)
            .subscribe(result => {
                this.LoadList();
                this.Cancel(form);
                $('#ProductsModal').modal('hide');
                this.Toastr.successToastr(result.SubCategoryName + ' create successfully', "Success");

            }, error => this.Toastr.errorToastr(error, "Error"));
    }


    UpdateProducts(form: NgForm, formData: FormData) {



        this.Http.put(this.BaseUrl + 'api/Products/' + this.Products.ProductId, formData)
            .subscribe(result => {
                let name = this.Products.ProductName;
                this.LoadList();
                this.Cancel(form);
                $('#ProductsModal').modal('hide');
                this.Toastr.successToastr(name + ' updated successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));
    }

    public GetProducts(id: number) {

        this.Http.get<Products>(this.BaseUrl + 'api/Products/' + id)
            .subscribe(result => {
                this.Products = result;
                $('#ProductsModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }



    public DeleteConfirmation(p: Products) {

        this.Products = p;
        $('#deleteModal').modal('show');

    }


    public DeleteProducts(id: number) {

        this.Http.delete<Products>(this.BaseUrl + 'api/Products/' + id)
            .subscribe(result => {
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(result.ProductName + ' deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}


class Products {
    ProductId: number = 0;
    ProductName: string;
    public Image: string = "";
    public Upload: File;
    public SubCatId: number;
    public GroupId: number;
    public BrandId: number;
    SubCategoryName: string;
    BrandName: string;
    GroupName: string;

    //Sizes: number[];
    //SizesValue: string;


}

class SubCategory {
    SubCatId: number;
    SubCategoryName: string;

}

class Brand {
    BrandId: number;
    BrandName: string;

}
class ProductGroup {
    GroupId: number;
    GroupName: string;

}
