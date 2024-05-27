import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../../models/shoppinglist.model';
import { ShoppinglistService } from '../../../services/shoppinglist.service';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  shoppinglist: Shoppinglist[] = [];

  constructor(private shoppinglistService: ShoppinglistService, private router: Router) { }

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
    this.shoppinglistService. deleteItem(itemId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error: any) => {
        console.error('An error occurred while deleting the item:', error);
      }
    });
  }

  drop(event: CdkDragDrop<Shoppinglist[]>): void {
    moveItemInArray(this.shoppinglist, event.previousIndex, event.currentIndex);
  }

  toggleImportant(item: Shoppinglist): void {
    item.isImportant = !item.isImportant;
    this.shoppinglistService.updateItem(item.id, item).subscribe({
      next: () => {
        this.shoppinglist.sort((a, b) => {
          if (a.isImportant === b.isImportant) {
            return a.item.localeCompare(b.item);
          }
          return a.isImportant ? -1 : 1;
        });        
      },
      error: (error: any) => {
        console.error('An error occurred while updating the item:', error);
      }
    });
  }
}
