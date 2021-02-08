import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/models/account.model';
import { UploadService } from 'src/services/upload.service';
import { HttpClient } from '@angular/common/http';
declare let $: any;

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  categories: any = ['Basic', 'Classic', 'Personal', 'Unlimited'];
  currentAccount: Account = { id: '', category: 'Basic', doc: '', type: 'cpf' };
  message = '';
  messageFile = '';
  selectedFiles!: FileList;
  currentFileUpload!: File;
  progress: { percentage: number } = { percentage: 0 };
  //selectedFile = null;
  changeImage = false;
  file?: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    private https: HttpClient) { }

  ngOnInit(): void {
    this.getAccount(this.route.snapshot.params.id);
  }

  getAccount(id: string): void {
    this.accountService.get(id)
      .subscribe(
        data => {
          this.currentAccount = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateActive(status: boolean): void {
    const data = {
      active: status
    };

    this.accountService.update(this.currentAccount.id, data)
      .subscribe(
        response => {
          this.currentAccount.active = status;
          console.log(response);
          this.message = "Account " + (this.currentAccount.active ? "Activated!" : "Inactivated!");
        },
        error => {
          console.log(error);
        });
  }

  updateAccount(): void {
    this.accountService.update(this.currentAccount.id, this.currentAccount)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Account Updated!";
        },
        error => {
          console.log(error);
        });
  }

  deleteAccount(): void {
    this.accountService.delete(this.currentAccount.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/accounts']);
        },
        error => {
          console.log(error);
        });
  }

  /* File Manager */
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles.item(0)?.name;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0) as any;
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.currentAccount.id).subscribe(event => {
      //this.selectedFiles = undefined as any;
      this.file = this.currentAccount.id + this.currentFileUpload.name.substring(this.currentFileUpload.name.length - 5, this.currentFileUpload.name.length);
      this.messageFile = "File uploaded successfully!";
    }, err => this.messageFile = "Error when try upload the file!");
    this.changedImage(event);
  }

  viewFile() {
    window.open('https://ioblue.s3.us-east-2.amazonaws.com/' + this.currentAccount.id + '.png');
  }

  public getLinkPicture() {
    if(this.changeImage) {
       return 'https://ioblue.s3.us-east-2.amazonaws.com/' + this.currentAccount.id + '.png?' + (new Date()).getTime();
    }
    return null;
  }

  imageExists() {
    let url = $('#photo')[0].src;
    let ext = url.substring(url.lastIndexOf(".") + 1);
    if(ext == 'jpg') {
      return false;
    }
    return true;
  } 

  changedImage(event: any) {
    this.changeImage = true;
    this.selectedFiles = undefined as any;
  }

  deleteFile() {
    this.https.post<string>('http://ioblue.us-east-2.elasticbeanstalk.com/api/v1/storage/delete?name=' + this.currentAccount.id + '.png', null).subscribe(
      res => {
        this.file = res;
      }
    );
  }

}
