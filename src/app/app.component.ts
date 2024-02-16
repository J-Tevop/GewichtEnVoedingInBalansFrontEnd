import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { FooterComponent } from './footer/footer.component'
import { BlogComponent } from './blog/blog.component'
import { HeaderComponent } from './header/header.component'
import { CommonModule } from '@angular/common'
import { MatMenuItem, MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    BlogComponent,
    HeaderComponent,
    CommonModule,
    MatMenuItem,
    MatMenuModule,
  ],
})
export class AppComponent {
  title = 'GewichtEnVoedingInBalans'
}
