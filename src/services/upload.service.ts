import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  constructor(private https: HttpClient) { }

  pushFileToStorage(file: File, name: string): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const fileName = name + ' ' + file.name.substring(file.name.length -5, file.name.length);
    console.log(fileName);
    const newRequest = new HttpRequest('POST', 'http://ioblue.us-east-2.elasticbeanstalk.com/api/v1/storage/upload?name=' + name + '.png', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);    
  }

  
}