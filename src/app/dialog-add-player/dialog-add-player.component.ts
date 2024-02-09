import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importieren Sie MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importieren Sie MatButtonModule

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
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

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
