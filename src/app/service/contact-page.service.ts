import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Mail, CreateMail } from '../types/mail'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { response } from 'express'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ContactPageService {
  constructor(private http: HttpClient) {}

  sendMail(Mail: CreateMail): Observable<string> {
    return this.http
      .post(`${environment.API_URL}/api/sendMail`, Mail, {
        responseType: 'json',
        observe: 'body',
      })
      .pipe(
        map((response: any) => response.message),
        catchError(error => {
          console.error('Error occurred:', error)
          return throwError(() => new Error(error))
        }),
      )
  }
}
