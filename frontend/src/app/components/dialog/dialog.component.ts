import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  #service = inject(ProductService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {}

  deleteProduct(): void {
    this.#service.deleteProduct(this.data.id).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close({ successful: true });
      },
      error: (err) => {
        this.dialogRef.close({ successful: false });
        console.log(err);
      },
    });
  }
}
