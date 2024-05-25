import { Component, OnInit } from '@angular/core';
import { Shoppinglist } from '../../models/shoppinglist.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrl: './shoppinglist.component.css'
})
export class ShoppinglistComponent implements OnInit {

  shoppinglist: Shoppinglist[] = [];
  constructor() { }

  ngOnInit(): void {
    this.shoppinglist.push();
  }

}
