import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../models/shoppinglist.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrl: './shoppinglist.component.css'
})
export class ShoppinglistComponent implements OnInit {

  shoppinglist: Shoppinglist[] = [
    {item: 'Milk', quantity: 1},
    {item: 'Bread', quantity: 2},
    {item: 'Eggs', quantity: 12},
    {item: 'Butter', quantity: 1},
  ];
  constructor() { }

  ngOnInit(): void {
    this.shoppinglist.push();
  }

}
