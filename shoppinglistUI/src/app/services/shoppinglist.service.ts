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
    return this.http.get<Shoppinglist[]>(`${this.baseApiUrl}/api/Shopping/GetShopping`);
  }

  addItem(addItemRequest: Shoppinglist): Observable<Shoppinglist> {
    addItemRequest.id = '';
    return this.http.post<Shoppinglist>(this.baseApiUrl + '/api/Shopping', addItemRequest);
  }

  getItem(id: string): Observable<Shoppinglist> {
    return this.http.get<Shoppinglist>(this.baseApiUrl +'/api/Shopping/' + id);
  }

  updateItem(id: string, updateItemRequest: Shoppinglist): Observable<Shoppinglist> {
    return this.http.put<Shoppinglist>(this.baseApiUrl + '/api/Shopping/' + id, updateItemRequest);

  }
  deleteItem(id: string): Observable<Shoppinglist> {
    return this.http.delete<Shoppinglist>(this.baseApiUrl + '/api/Shopping/' + id);
  }
  // addToFavourite(id: string): Observable<Shoppinglist> {
  //   return this.http.put<Shoppinglist>(this.baseApiUrl + '/api/Shopping/Favourite/' + id, {});
  // }
}
