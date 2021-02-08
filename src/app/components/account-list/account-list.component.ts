import { Component, OnInit } from '@angular/core';
import { Account } from 'src/models/account.model';
import { Observable } from 'rxjs';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts?: Account[];
  currentAccount?: Account;
  currentIndex = -1;
  doc = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.retrieveAccounts();
  }

  retrieveAccounts(): void {
    this.accountService.getAll()
      .subscribe(
        data => {
          this.accounts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveAccounts();
    this.currentAccount = undefined;
    this.currentIndex = -1;
  }

  setActiveAccount(account: Account, index: number): void {
    this.currentAccount = account;
    this.currentIndex = index;
  }

  removeAllAccounts(): void {
    this.accountService.deleteAll()
    .subscribe(
      response => {
        console.log(response);
        this.refreshList();
      },
      error => {
        console.log(error);
      });
  }

  findByDoc(): void {
    this.accountService.findByDoc(this.doc)
      .subscribe(
        data => {
          this.accounts = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  
  public getLinkPicture() {
    if(this.currentAccount) {
       return 'https://ioblue.s3.us-east-2.amazonaws.com/' + this.currentAccount.id + '.png?' + (new Date()).getTime();
    }
    return null;
  }

}
