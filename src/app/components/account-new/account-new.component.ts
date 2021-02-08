import { Component, OnInit } from '@angular/core';
import { Account } from 'src/models/account.model';
import { AccountService } from 'src/services/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {
  categories: any = ['Basic', 'Classic', 'Personal', 'Unlimited'];
  account: Account = { category: 'Basic', doc: '', type: 'CPF', agency: Math.floor(Math.random() * 9999), number: Math.floor(Math.random() * 99999) };
  submitted = false;

  form = new FormGroup({
    type: new FormControl(this.account.type, Validators.required),
    doc: new FormControl(this.account.doc, Validators.required),
    category: new FormControl(this.account.category, Validators.required),
    agency: new FormControl(this.account.agency, Validators.required),
    number: new FormControl(this.account.number, Validators.required),
    description: new FormControl(this.account.description,)
  });

  constructor(private accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
  }

  saveAccount(): void {
    const data = {
      category: this.account.category,
      description: this.account.description,
      doc: this.account.doc,
      type: this.account.type,
      agency: this.account.agency,
      number: this.account.number
    };

    this.accountService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.goHome();
        },
        error => {
          console.log(error);
        });
  }

  newAccount(): void {
    this.submitted = false;
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    //console.log(this.form.value);
  }

  goHome() {
    this.router.navigate(['\accounts']);
  }

}