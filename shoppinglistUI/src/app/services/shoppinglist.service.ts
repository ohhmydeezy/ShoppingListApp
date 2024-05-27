import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shoppinglist } from '../models/shoppinglist.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  baseApiUrl: string = environment.baseAPIUrl

  constructor(private http: HttpClient) { }

  getShoppingList(): Observable<Shoppinglist[]> {
    return this.http.get<Shoppinglist[]>(this.baseApiUrl + '/api/Shopping/GetShopping');
  }

  addItem(item: Shoppinglist): Observable<Shoppinglist> {
    return this.http.post<Shoppinglist>(this.baseApiUrl, item);
  }
}
