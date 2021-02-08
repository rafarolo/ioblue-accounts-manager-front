import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountNewComponent } from './components/account-new/account-new.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountListComponent } from './components/account-list/account-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountListComponent },
  { path: 'accounts/:id', component: AccountDetailsComponent },
  { path: 'new', component: AccountNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
