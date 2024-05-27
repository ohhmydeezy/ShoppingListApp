import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../../models/shoppinglist.model';
import { ShoppinglistService } from '../../../services/shoppinglist.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  shoppinglist: Shoppinglist[] = [];

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
    this.shoppinglistService.getShoppingList().subscribe({
      next: (data) => {
        this.shoppinglist = data;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}