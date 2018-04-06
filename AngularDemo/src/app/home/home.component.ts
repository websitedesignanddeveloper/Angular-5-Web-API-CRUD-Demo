import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {  FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { ElementRef, ViewChild,Inject} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import{ DialogContentAddUserComponent} from '../dialogs/dialog-content-add-user/dialog-content-add-user.component';
import {DialogContentDeleteUserComponent} from '../dialogs/dialog-content-delete-user/dialog-content-delete-user.component';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {
  displayedColumns = ['id', 'firstName', 'lastName','office','position','actions'];
  dataSource: MatTableDataSource<Employee>;
  data;userDetails;
  showSpinner: boolean = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private _users: DataService,public dialog: MatDialog,private router: Router) {}

  refreshdata()
  {
    this.showSpinner=true;
    this.refreshTable();
    this.showSpinner=false;
  }
  upload(id: number, files: FileList) {
    const file = files.item(0);
    this._users.upload(file,id).subscribe(
      res =>{})
  }
  
  //Open Add Pop Up
  addNew() 
  {
    const dialogRef = this.dialog.open(DialogContentAddUserComponent, {
      height: "auto",
      width: "50%",
      data: {diloagName : "Add User",diloagButton :"Add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>this.refreshdata(), 1000);
    });
  }

  //Open Edit Pop Up
  startEdit(i: number, id: number) 
  {
    this._users.getEmployeeById(id.toString())
    .subscribe(res => {
     console.log(res);
      this.userDetails=res;
     
      if(this.userDetails.Profile!=null)
    {
      var test =  "http://localhost:51245/Userimage/"+this.userDetails.EmployeeID+".jpg";
      this.userDetails.Profile=test;
    }
  
     const dialogRef = this.dialog.open(DialogContentAddUserComponent, {
       height: "auto",
       width: "50%",
       data : {diloagName : "Edit User", diloagButton :"Edit",id:this.userDetails.EmployeeID,firstName: this.userDetails.FirstName,lastName: this.userDetails.LastName,office:this.userDetails.Office,position:this.userDetails.Position,empCode:this.userDetails.EmpCode,profile:this.userDetails.Profile}
     });
     
     dialogRef.afterClosed().subscribe( result => {

         setTimeout(()=>this.refreshdata(), 1000);   
     
     });
   })
  }

  deleteItem(i: number, emp: Employee) 
  {
    const dialogRef = this.dialog.open(DialogContentDeleteUserComponent, {
      data: {diloagName : "Delete User",id: emp.EmployeeID, name: emp.FirstName}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>this.refreshdata(), 1000);
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   
  ngOnInit() {this.loadData() }

  public loadData()
  {
    this.showSpinner=true;
    this.data = this._users.getEmployeeList()
    .subscribe(res => {
     console.log(res);
 
    this.data= res;
   
    
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.showSpinner=false;
    
 })
 
  }
  private refreshTable() {
    this.showSpinner=true;
    this.loadData();
    // if there's a paginator active we're using it for refresh
    if (this.dataSource.paginator.hasNextPage()) {
      this.dataSource.paginator.nextPage();
      this.dataSource.paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource.paginator.hasPreviousPage()) {
      this.dataSource.paginator.previousPage();
      this.dataSource.paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
     
    }
    this.showSpinner=false;
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