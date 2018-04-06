import { Component, OnInit,ViewChild,Inject} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA,MatSelect} from '@angular/material';
import { DataService } from '../../data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dialog-content-add-user',
  templateUrl: './dialog-content-add-user.component.html',
  styleUrls: ['./dialog-content-add-user.component.scss']
})
export class DialogContentAddUserComponent {
  user: any = {};
  errorMsg = '';

 formControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogContentAddUserComponent>,private _users: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onCancle(): void {
    this.dialogRef.close();
  }

  onAdd(data)
  {
    this.user=data;

   
    if(this.user.id==undefined||this.user.id==null)
    {
    //Add Employee Service Call
    this._users.postEmployee(this.user)
    .subscribe(res => {
      console.log(res);
    
  })

    }
    else
    {
      //Edit Employee Service Call
      this._users.putEmployee(this.user.id,this.user)
      .subscribe(res => {
        console.log(res);  
    })
    }
    
  }
 



  ngOnInit() {}

}
