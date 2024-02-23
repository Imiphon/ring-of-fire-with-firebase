import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-say-goodbye-dialog',
  templateUrl: './goodby-info.component.html',
  styleUrls: ['./goodby-info.component.scss'],
  imports: [MatDialogModule, CommonModule],
  standalone: true, 
})
export class GoodbyInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<GoodbyInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  onNameClick(name:string):void {
    this.dialogRef.close(name); //close dialg and return name
  }

  onNoThanksClick(): void {
    this.dialogRef.close(false); // close dialog and return false
  }

}
