import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Mail, CreateMail } from '../types/mail'
import { Observable, tap } from 'rxjs'
import { response } from 'express'

@Injectable({
  providedIn: 'root',
})
export class ContactPageService {
  constructor(private http: HttpClient) {}
  sendMail(Mail: CreateMail): Observable<string> {
    return this.http
      .post('http://localhost:8080/sendMail', Mail, {
        responseType: 'text',
      })
  }
}
