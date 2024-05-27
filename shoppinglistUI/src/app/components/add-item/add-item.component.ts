import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../models/shoppinglist.model';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']  // Corrected the property name
})
export class AddItemComponent implements OnInit {

  addItemRequest: Shoppinglist = {
    id: '',
    item: '',
    quantity: 0
  };

  constructor(private shoppinglistService: ShoppinglistService, private router: Router) { }

  ngOnInit(): void {
  }

  addItem() {
    console.log(this.addItemRequest);
  }
}
