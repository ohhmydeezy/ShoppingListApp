import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../../models/shoppinglist.model';
import { ShoppinglistService } from '../../../services/shoppinglist.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
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
    if (event.previousContainer === event.container) {
      // Moving within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.sortShoppingList(); // Sort the list after moving within the same list
    } else {
      // Moving between lists
      const movedItem = event.previousContainer.data[event.previousIndex];
      const targetList = event.container.data;
  
      // Check if an item with the same name exists in the target list
      const existingItem = targetList.find(item => item.item === movedItem.item);
  
      if (existingItem) {
        // Increment the quantity of the existing item
        existingItem.quantity++;
  
        // Remove the moved item from the original list
        event.previousContainer.data.splice(event.previousIndex, 1);
  
        // Persist the changes for the existing item
        this.shoppinglistService.updateItem(existingItem.id, existingItem).subscribe(
          updatedItem => {
            console.log('Item successfully updated:', updatedItem);
          },
          error => {
            console.error('Error updating item:', error);
          }
        );
  
        //  Remove the moved item from the backend
        this.shoppinglistService.deleteItem(movedItem.id).subscribe(
          () => {
            console.log('Item successfully deleted:', movedItem);
          },
          error => {
            console.error('Error deleting item:', error);
          }
        );
      } else {
        // No existing item found, move the item to the new list
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
  
        // Update isBought property and isImportant property accordingly and persist changes
        movedItem.isBought = (event.container.id === 'boughtList');
        if (movedItem.isBought) {
          movedItem.isImportant = false; // Ensure isImportant is false for bought items
        }
  
        this.shoppinglistService.updateItem(movedItem.id, movedItem).subscribe(
          updatedItem => {
            console.log('Item successfully updated:', updatedItem);
          },
          error => {
            console.error('Error updating item:', error);
          }
        );
      }
  
      // Sort both lists after moving between lists
      this.sortShoppingList();
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
    item.isImportant = false;
    this.shoppinglistService.updateItem(item.id, item).subscribe({
      next: () => {
        // Remove the item from the shoppinglist array
        this.shoppinglist = this.shoppinglist.filter(shoppingItem => shoppingItem.id !== item.id);
        // Add the item to the boughtList array
        this.boughtList.push(item);
        console.log('Item marked as bought');
      },
      error: (error: any) => {
        console.error('An error occurred while updating the item:', error);
      }
    });
  }

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
