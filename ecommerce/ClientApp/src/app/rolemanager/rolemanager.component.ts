import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';
declare var $: any;



@Component({
  selector: 'app-rolemanager',
  templateUrl: './rolemanager.component.html'
})

export class RoleManager {

  public Http: HttpClient;
  public BaseUrl: string;

  public RoleList: Role[];
  public Role: Role;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.Http = http;
    this.BaseUrl = baseUrl;
    this.LoadList();
  }
  public LoadList() {
    this.Http.get<Role[]>(this.BaseUrl + 'api/role')
      .subscribe(result => {
        this.RoleList = result;
      }, error => {
        console.error(error);
      });
    this.Cancel(null);
  }
  public Cancel(form: NgForm) {
    if (form != null)
      form.resetForm();
    this.Role = new Role();
  }
  public SubmitRole(form: NgForm) {
    if (this.Role.Id == null || this.Role.Id == '') {
      this.CreateRole(form);
    }
  }
  CreateRole(form: NgForm) {

    this.Http.post<Role>(this.BaseUrl + 'api/role', this.Role)
      .subscribe(result => {
        this.LoadList();
        this.Cancel(form);
        $('#roleModal').modal('hide');
      }, error => {
        console.error(error);
      });
  }
  public GetRole(id: string) {
    this.Http.get<Role>(this.BaseUrl + 'api/role/' + id)
      .subscribe(result => {
        this.Role = result;
        $('#roleModal').modal('show');
      }, error => {
        console.error(error);
      });
  }
}

class Role {
  public Id: string = '';
  public Name: string = '';
}

