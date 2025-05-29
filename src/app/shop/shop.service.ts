import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ipagnation } from '../shared/models/pagnation';
import { Observable } from 'rxjs';
import { ICategory } from '../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = "https://localhost:44375/api/";
  product!:IProduct[]
  constructor(private _http: HttpClient) { }

  getProduct(categoryId?: number,sortSelected?:string,search?:string) {
    let param = new HttpParams();
    if (categoryId) {
      param=param.append("categoryId",categoryId)
    }
    if (sortSelected) {
      param=param.append("Sort",sortSelected)
    }
    if (search) {
      param=param.append("Search",search)
    }
    return this._http.get<Ipagnation>(this.baseUrl+"Products/get-all",{params:param});
  }

  getCategory() {
    return this._http.get<ICategory[]>(this.baseUrl+"Categories/get-all")
  }


}
