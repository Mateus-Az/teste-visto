import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import e from 'cors';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackService } from '../../services/snack-service/snack.service';

export interface Product {
  image: string;
  id: string;
  name: string;
  description: string;
  price: string;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIcon,
    MatButtonToggleModule,
    MatCheckboxModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit, OnInit {
  #router = inject(Router);
  #service = inject(ProductService);
  pageIndex = signal(0);
  pageSize = signal(10);
  totalItems = signal(0);
  readonly dialog = inject(MatDialog);
  hideSingleSelectionIndicator = signal(false);
  selectedView = signal('table');
  dataSource: MatTableDataSource<Product>;
  cards = signal(new Array());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = [
    'image',
    'id',
    'name',
    'description',
    'price',
    'actions',
  ];

  constructor(private _snackBar: MatSnackBar, private _utiles: SnackService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.#service
      .getAllProduct(this.pageIndex(), this.pageSize())
      .subscribe((resp) => {
        const products = resp.content;

        const productList = products.map((product: any) => ({
          id: product.id,
          image: product.imageUrl,
          name: product.name,
          description: product.description,
          price: product.price,
        }));

        this.dataSource.data = productList;
        this.cards.set(productList);
        this.totalItems.set(resp.totalElements);
      });
  }

  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSize();
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changePage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadItems();
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update((value: any) => !value);
  }

  openSnackBarGlobal(mgs: string) {
    this._utiles.emitSnack(mgs);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    idProduct: string
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { id: idProduct },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog',
    });
    dialogRef.afterClosed().subscribe((successful) => {
      if (successful) {
        this.openSnackBarGlobal('Produto excluído');
        this.dataSource.data = this.dataSource.data.filter(
          (product) => product.id !== idProduct
        );
        this.cards.set(this.dataSource.data);
        this.table.renderRows();
        this.totalItems.set(this.dataSource.data.length);
      }
    });
  }

  editItem(id: any) {
    this.#router.navigate(['products/edit/', id]);
  }

  registerItem() {
    this.#router.navigate(['products/form']);
  }
}
