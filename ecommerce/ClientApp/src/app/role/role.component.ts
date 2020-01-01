import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { isNullOrUndefined } from 'util';
import {NgxPrintModule} from 'ngx-print';

declare var $: any;

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})

export class PersonComponent {

  public PersonList: Person[];
  public CountryList: Country[];


  public Http: HttpClient;
  public BaseUrl: string;
  public Toastr: ToastrManager;
  public photoPreview: string | ArrayBuffer;


  public Person: Person;


 

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

    this.Http = http;
    this.BaseUrl = baseUrl;
    this.Toastr = toastr;
    this.LoadList();
    this.Toastr.successToastr(' Data loaded successfully', "Success");


  }




  public LoadList() {

    this.Http.get<Person[]>(this.BaseUrl + 'api/People')
      .subscribe(result => {
        this.PersonList = result;
      }, error => this.Toastr.errorToastr(error, "Error"));
    this.Cancel(null);
    this.LoadCountryList();
    
  }

  public LoadCountryList() {

    this.Http.get<Country[]>(this.BaseUrl + 'api/Countries')
      .subscribe(result => {
        this.CountryList = result;
      }, error => this.Toastr.errorToastr(error, "Error"));
  }


  public Cancel(form: NgForm) {
    
    if (form != null)
      form.resetForm();

    this.Person = new Person();
    this.photoPreview = null;
  }
  onFileChanged(event) {
    this.Person.photoUpload = event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.Person.photoUpload.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.Person.photoUpload);
    reader.onload = (_event) => {
      this.photoPreview = reader.result;
    }
  }


  public SubmitPerson(form: NgForm) {

    //this.Person = <Person>form.value;



    if (this.Person.id == 0) {
      this.CreatePerson(form);
    }
    else {
      this.UpdatePerson(form);
    }
  }

  CreatePerson(form: NgForm) {

    //    const headers = new Headers({});
    //let options = new RequestOptions({ headers });



    //let headers = new Headers();
    //headers.set('Content-Type', 'multipart/form-data');

    //let options = new HttpHeaders();
    //options.delete('enctype');
    //options.append('enctype', 'multipart/form-data');


    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'enctype': 'multipart/form-data'
      })
    };



    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    //let reqOpt = { headers: options };

    this.Http.post<Person>(this.BaseUrl + 'api/People', this.Person
      //, {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') }
      )
      .subscribe(result => {
        this.LoadList();
        this.Cancel(form);
        $('#personModal').modal('hide');
        this.Toastr.successToastr(result.fullName + ' create successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }

  UpdatePerson(form: NgForm) {

    //let headers = new Headers();
    //headers.set('Content-Type', 'multipart/form-data');

    let options = new HttpHeaders();
    options.append('Content-Type', 'multipart/form-data');

    let reqOpt = { headers: options };

    this.Http.put(this.BaseUrl + 'api/People/' + this.Person.id, this.Person, reqOpt)
      .subscribe(result => {
        let name = this.Person.fullName;
        this.LoadList();
        this.Cancel(form);
        $('#personModal').modal('hide');
        this.Toastr.successToastr(name + ' updated successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));
  }



  public GetPerson(id: number) {

    this.Http.get<Person>(this.BaseUrl + 'api/People/' + id)
      .subscribe(result => {
        this.Person = result;
        $('#personModal').modal('show');
      }, error => this.Toastr.errorToastr(error, "Error"));

  }

  public DeleteConfirmation(p: Person) {

    this.Person = p;
    $('#deleteModal').modal('show');

  }
  public DeletePerson(id: number) {





    this.Http.delete<Person>(this.BaseUrl + 'api/People/' + id)
      .subscribe(result => {
        this.LoadList();
        $('#deleteModal').modal('hide');
        this.Toastr.successToastr(result.fullName + ' deleted successfully', "Success");
      }, error => this.Toastr.errorToastr(error, "Error"));

  }
}

class Person {

  constructor() {

    this.id = 0;
    //this.firstName = '';
    //this.lastName = '';
    this.fullName = this.firstName + ' ' + this.lastName;
    //this.gender = 'Male';
    //this.address = '';

  }



  public id: number = 0;
  public firstName: string = '';
  public lastName: string = '';
  public fullName: string = '';
  public gender: string = 'Male';
  public address: string = '';
  public countryId: number;
  public photoPath: string = '';

  public photoUpload: File;





}

interface Country {
  countryId: number;
  name: string;

}
