import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  #http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8085';
  private readonly BASE_URL_IMG = 'https://api.imgbb.com/1';

  //=========== POST IMG ================
  postImg(formData: FormData) {
    return this.#http.post(
      this.BASE_URL_IMG + '/upload?key=d6ea82ad255cdc60cf583d3b79bce1ec',
      formData
    );
  }
  //=========== POST IMG ================

  //=========== POST PRODUCT ================
  postProduct(formData: FormData) {
    return this.#http.post(this.BASE_URL + '/products', formData);
  }
  //=========== POST PRODUCT ================

  //=========== PUT PRODUCT  ================
  putProduct(formData: FormData, id: String) {
    return this.#http.put(this.BASE_URL + `/products/${id}`, formData);
  }
  //=========== PUT PRODUCT  ================

  //=========== GET PRODUCT BY ID ================
  getProduct(id: String) {
    return this.#http.get<any>(this.BASE_URL + `/products/${id}`);
  }
  //=========== GET PRODUCT BY ID ================

  //=========== GET ALL PRODUCT ================
  getAllProduct(page: number, size: number): Observable<any> {
    return this.#http.get<any>(
      this.BASE_URL + `/products?page=${page}&size=${size}`
    );
  }
  //=========== GET ALL PRODUCT ================

  //=========== DELETE PRODUCT  ================
  deleteProduct(id: String) {
    return this.#http.delete(this.BASE_URL + `/products/${id}`);
  }
  //=========== DELETE PRODUCT  ================

  constructor() {}
}
