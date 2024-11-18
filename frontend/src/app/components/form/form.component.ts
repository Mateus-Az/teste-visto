import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';
import { EMPTY, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackService } from '../../services/snack-service/snack.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatInputModule,
    MatIcon,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  #router = inject(Router);
  #location = inject(Location);
  #fb = inject(FormBuilder);
  #service = inject(ProductService);
  #activeRoute = inject(ActivatedRoute);

  isLoadingImg = signal(false);
  isModeEdit = signal(false);

  imagePreview: string | ArrayBuffer | any = null;
  id: string = '';
  selectedFile: File | any = null;

  public uploadImgForm: FormGroup = this.#fb.group({
    image: [''],
  });

  public productForm: FormGroup = this.#fb.group({
    id: [''],
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
  });

  constructor(private _snackBar: MatSnackBar, private _utiles: SnackService) {}

  ngOnInit(): void {
    this.#activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        console.log('Entrou');
        this.isModeEdit.set(true);
        this.#service.getProduct(this.id).subscribe({
          next: (res) => {
            this.productForm.setValue({
              id: res.id,
              name: res.name,
              price: res.price,
              description: res.description,
              imageUrl: res.imageUrl,
            });
            this.loadImageFromUrl(res.imageUrl);
          },
        });
      }
    });
  }

  loadImageFromUrl(url: string) {
    this.imagePreview = url;
  }

  return() {
    this.#location.back();
  }

  onImageSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  removeImgSelected() {
    this.selectedFile = null;
    this.imagePreview = null;
  }

  onFileSelected(event: any) {
    this.isLoadingImg.set(true);
    this.selectedFile = <File>event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      setTimeout(() => {
        this.isLoadingImg.set(false);
      }, 400);
    };
    reader.readAsDataURL(this.selectedFile);
  }

  openSnackBarGlobal(mgs: string) {
    this._utiles.emitSnack(mgs);
  }
  openSnackBarGlobalError(mgs: string) {
    this._utiles.emitSnackError(mgs);
  }

  onSubmit() {
    if (!this.isModeEdit()) {
      this.postProduct();
    } else {
      this.updateProduct();
    }
  }

  postProduct() {
    if (
      this.uploadImgForm.valid &&
      this.selectedFile &&
      this.productForm.valid
    ) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      console.log(JSON.stringify(this.productForm.value));

      this.#service
        .postImg(formData)
        .pipe(
          switchMap((res: any) => {
            const imageUrl = res.data.url;
            this.productForm.patchValue({ imageUrl: imageUrl });
            return this.#service.postProduct(this.productForm.value);
          })
        )
        .subscribe(this.handleResponse());
    } else if (this.productForm.valid && !this.selectedFile) {
      this.#service
        .postProduct(this.productForm.value)
        .subscribe(this.handleResponse());
    }
  }

  updateProduct() {
    if (this.productForm.valid && this.isModeEdit()) {
      if (!this.selectedFile) {
        if (!this.imagePreview)
          this.productForm.patchValue({
            imageUrl: '',
          });

        console.log(this.productForm.value);

        this.#service.putProduct(this.productForm.value, this.id).subscribe({
          next: (res) => {
            console.log(res);
            this.openSnackBarGlobal('Produto atualizado ✅');
            this.#location.back();
          },
          error: (err) => {
            console.log(err);
            this.openSnackBarGlobalError(
              'Ocorreu um erro ao atualizar o produto ⚠️'
            );
          },
        });
        return;
      }
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.#service
        .postImg(formData)
        .pipe(
          switchMap((res: any) => {
            const imageUrl = res.data.url;
            this.productForm.patchValue({
              imageUrl: imageUrl,
            });
            return this.#service.putProduct(this.productForm.value, this.id);
          })
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.openSnackBarGlobal('Produto atualizado ✅');
            this.#location.back();
          },
          error: (err) => {
            console.log(err);
            this.openSnackBarGlobalError(
              'Ocorreu um erro ao atualizar o produto ⚠️'
            );
          },
        });
    }
  }

  private validateImage(file: File): boolean {
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file.size > maxSize) {
      this.openSnackBarGlobalError('A imagem deve ter no máximo 5MB ⚠️');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      this.openSnackBarGlobalError('Formato de imagem não suportado ⚠️');
      return false;
    }

    return true;
  }

  private handleResponse() {
    return {
      next: (res: any) => {
        console.log(res);
        this.openSnackBarGlobal('Produto cadastrado ✅');
        this.resetForm();
        this.#router.navigate(['/painel']);
      },
      error: (err: any) => {
        console.error(err);
        this.openSnackBarGlobalError(
          'Ocorreu um erro ao cadastrar o produto ⚠️'
        );
      },
    };
  }

  private resetForm() {
    this.productForm.reset();
    this.uploadImgForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
