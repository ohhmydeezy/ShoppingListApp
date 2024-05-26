import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistComponent } from './components/shop/shoppinglist/shoppinglist.component';
import { AddItemComponent } from './components/add-item/add-item.component';

const routes: Routes = [
  { path: '',
    component: ShoppinglistComponent,
  },
  { path: 'shoppinglist',
    component: ShoppinglistComponent,
  },
  { path: 'shoppinglist/AddItem',
  component: AddItemComponent,
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
