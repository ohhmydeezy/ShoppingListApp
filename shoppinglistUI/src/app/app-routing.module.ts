import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistComponent } from './shop/shoppinglist/shoppinglist.component';

const routes: Routes = [
  { path: '',
    component: ShoppinglistComponent,
  },
  { path: 'shoppinglist',
    component: ShoppinglistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
