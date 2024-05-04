import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importieren Sie MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importieren Sie MatButtonModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, // Fügen Sie MatInputModule hinzu
    MatButtonModule, // Fügen Sie MatButtonModule hinzu
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})

export class DialogAddPlayerComponent {
  name: string = '';
  invalidName: boolean = false;
  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  onOkClick(): void {
    if (!this.name.trim()) {
      this.invalidName = true; // shows error if no Name
    } else {
      this.dialogRef.close(this.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
