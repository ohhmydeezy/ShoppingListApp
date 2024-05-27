import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../../models/shoppinglist.model';
import { ShoppinglistService } from '../../../services/shoppinglist.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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
        this.shoppinglist.sort((a, b) => a.item.localeCompare(b.item));
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteItem(itemId: string): void {
    // Your delete item logic here
  }

  drop(event: any): void {
    moveItemInArray(this.shoppinglist, event.previousIndex, event.currentIndex);
  }
}


