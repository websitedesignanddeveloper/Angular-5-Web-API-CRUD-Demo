import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  result: any;
  data:any=[];
   
   selectedEmployee : Employee;
   employeeList : Employee[];
   constructor(private http : Http) {}
  
   postEmployee(emp : Employee)
   {
     var body = JSON.stringify(emp);
     var headerOptions = new Headers({'Content-Type':'application/json'});
     var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
     return this.http.post('http://localhost:51245/api/Employees',body,requestOptions).map(x => x.json());
   }
  
   putEmployee(id, emp) 
   {
     var body = JSON.stringify(emp);
     var headerOptions = new Headers({ 'Content-Type': 'application/json' });
     var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
     return this.http.put('http://localhost:51245/api/Employees/' + id,body,requestOptions).map(res => res.json());
   }
  
   getEmployeeList()
   {
    return this.http.get('http://localhost:51245/api/Employees').map(result => result.json());
   }
  
   deleteEmployee(id: number) 
   {
     return this.http.delete('http://localhost:51245/api/Employees/' + id).map(res => res.json());
   }

   getEmployeeById(id: string)
   {
    return this.http.get('http://localhost:51245/api/Employees/' + id).map(result => result.json());
   }

   upload(file: File, id:number): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append(id.toString(), file, file.name);
 
    return this.http.post('http://localhost:51245/user/PostUserImage', formData);
  }

   
 
 }
 
 export class Employee {
     EmployeeID : number;
     FirstName:string;
     LastName:string;
     EmpCode:string;
     Position:string;
     Office:string;
     Profile:string;
 }
