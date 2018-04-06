import { Component, OnInit,ViewChild,Inject} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from '../../data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-dialog-content-delete-user',
  templateUrl: './dialog-content-delete-user.component.html',
  styleUrls: ['./dialog-content-delete-user.component.scss']
})
export class DialogContentDeleteUserComponent implements OnInit {

  constructor(private _users: DataService, public dialogRef: MatDialogRef<DialogContentDeleteUserComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

onNoClick(): void 
{
  this.dialogRef.close();
}

confirmDelete(data): void {
//call delete service 
this._users.deleteEmployee(data)
.subscribe(res => {
  console.log(res);
})
}

 ngOnInit() {}

}
