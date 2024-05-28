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
  boughtList: Shoppinglist[] = [];
  selection: any;

  constructor(private shoppinglistService: ShoppinglistService, private router: Router) { }

  ngOnInit(): void {
    this.shoppinglistService.getShoppingList().subscribe({
      next: (data) => {
        this.shoppinglist = data.filter(item => !item.isBought);
        this.boughtList = data.filter(item => item.isBought);
        this.sortShoppingList();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteItem(itemId: string): void {
    this.shoppinglistService.deleteItem(itemId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error) => {
        console.error('An error occurred while deleting the item:', error);
      }
    });
  }

  drop(event: CdkDragDrop<Shoppinglist[]>): void {
    const movedItem = this.shoppinglist[event.previousIndex];

    // Find the first non-important item index
    const firstNonImportantIndex = this.shoppinglist.findIndex(item => !item.isImportant);

    // Determine the allowed range for the move
    const minIndex = movedItem.isImportant ? 0 : firstNonImportantIndex;
    const maxIndex = this.shoppinglist.length - 1;

    // Check if the new position is within the allowed range
    if (event.currentIndex >= minIndex && event.currentIndex <= maxIndex) {
      moveItemInArray(this.shoppinglist, event.previousIndex, event.currentIndex);
    }

  }

  toggleImportant(item: Shoppinglist): void {
    item.isImportant = !item.isImportant;
    this.shoppinglistService.updateItem(item.id, item).subscribe({
      next: () => {
        this.sortShoppingList();
      },
      error: (error) => {
        console.error('An error occurred while updating the item:', error);
      }
    });
  }

  markAsBought(item: Shoppinglist): void {
    item.isBought = true;
    this.shoppinglistService.updateItem(item.id, item).subscribe({
      next: () => {
        this.ngOnInit();
        this.selection.clear()
      },
      error: (error: any) => {
        console.error('An error occurred while updating the item:', error);
      }
    });
  }

  // Sort the shopping list and the bought list

  private sortShoppingList(): void {
    this.shoppinglist.sort((a, b) => {
      if (a.isImportant === b.isImportant) {
        return a.item.localeCompare(b.item);
      }
      return a.isImportant ? -1 : 1;
    });

    this.boughtList.sort((a, b) => {
      if (a.isImportant === b.isImportant) {
        return a.item.localeCompare(b.item);
      }
      return a.isImportant ? -1 : 1;
    });
  }
}

