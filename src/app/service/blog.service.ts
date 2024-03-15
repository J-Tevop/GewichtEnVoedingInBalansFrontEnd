import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Blog } from '../types/blog'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  getAllBlogs(): Observable<Array<Blog>> {
    return this.http.get<Array<Blog>>(`${environment.API_URL}/api/blog`)
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${environment.API_URL}/api/blog/${id}`)
  }

  updateBlog() {}

  deleteBlog() {}

  createBlog() {}
}
