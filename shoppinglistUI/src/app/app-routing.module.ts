import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistComponent } from './components/shop/shoppinglist/shoppinglist.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';

const routes: Routes = [
  { path: '',
    component: ShoppinglistComponent,
  },
  { path: 'shoppinglist',
    component: ShoppinglistComponent,
  },
  { path: 'shoppinglist/Add',
  component: AddItemComponent,
  },
  { path: 'shoppinglist/editItem/:id',
  component: EditItemComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
