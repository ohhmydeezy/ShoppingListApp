import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../../models/shoppinglist.model';
import { ShoppinglistService } from '../../../services/shoppinglist.service';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  deleteItem(arg0: string) {
    throw new Error('Method not implemented.');
  }

  shoppinglist: Shoppinglist[] = [];

  MatcheckboxModule: MatCheckboxModule;

  constructor(private shoppinglistService: ShoppinglistService) {
    this.MatcheckboxModule = new MatCheckboxModule();
  }

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


}

