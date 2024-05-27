import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Shoppinglist } from '../../models/shoppinglist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemDetails: Shoppinglist | null = null;
  
  constructor(private route: ActivatedRoute, private shoppinglistService: ShoppinglistService, private router: Router) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.shoppinglistService.getItem(id).subscribe({
            next: (response) => {
              this.itemDetails = response;
            },
            error: (error) => {
              console.error('An error occurred:', error);
            }
          });
        }
      }
    });
  }

  updateItem(): void {
    if (this.itemDetails) {
      this.shoppinglistService.updateItem(this.itemDetails.id.toString(), this.itemDetails).subscribe({
        next: (response) => {
          this.router.navigate(['shoppinglist']);
        },
        error: (error) => {
          console.error('An error occurred while updating the item:', error);
        }
      });
    }
  }
  deleteItem(id: string): void {
    this.shoppinglistService.deleteItem(id).subscribe({
      next: (response) => {
        this.router.navigate(['shoppinglist']);
      },
      error: (error) => {
        console.error('An error occurred while deleting the item:', error);
      }
    });
}
}


