import { Component, OnInit } from '@angular/core'
import { Blog } from '../types/blog'
import { BlogService } from '../service/blog.service'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = []
  title = ''
  body = ''
  summary = ''

  getAllBlogs(): void {
    this.blogService.getAllBlogs().subscribe(blogs => (this.blogs = blogs))
  }

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getAllBlogs()
  }
}
