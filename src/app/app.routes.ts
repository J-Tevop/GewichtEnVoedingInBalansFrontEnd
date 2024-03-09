import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'
import { BlogComponent } from './blog/blog.component'
import { ContactPageComponent } from './contact-page/contact-page.component'

export const routes: Routes = [
  { path: '', title: 'Home', component: HomePageComponent },
  { path: 'blog', title: 'blog', component: BlogComponent },
  { path: 'contact', title: 'contact', component: ContactPageComponent },
]
