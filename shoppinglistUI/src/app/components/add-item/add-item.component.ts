import { Component } from '@angular/core';
import { Shoppinglist } from '../../models/shoppinglist.model';
import { OnInit } from '@angular/core';
import { ShoppinglistService } from '../../services/shoppinglist.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit{

  addItemRequest: Shoppinglist = {
    id: 0, 
    item: '',
    quantity: 0,
  };
  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit(): void {
  }
  addItem() {
    this.shoppinglistService.addItem(this.addItemRequest).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
