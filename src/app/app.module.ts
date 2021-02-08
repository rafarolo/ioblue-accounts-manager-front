import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountNewComponent } from './components/account-new/account-new.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountListComponent } from './components/account-list/account-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UploadService } from 'src/services/upload.service';


@NgModule({
  declarations: [
    AppComponent,
    AccountNewComponent,
    AccountDetailsComponent,
    AccountListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
