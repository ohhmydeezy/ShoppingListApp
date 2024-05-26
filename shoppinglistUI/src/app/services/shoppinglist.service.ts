import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Shoppinglist } from '../models/shoppinglist.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  baseAPIUrl: string = environment.baseAPIUrl;

  constructor(private http: HttpClient) { }

  getShoppingList(): Observable<Shoppinglist> {
    return this.http.get<Shoppinglist>(`${this.baseAPIUrl}/api/ShoppingList`);
  }
}
