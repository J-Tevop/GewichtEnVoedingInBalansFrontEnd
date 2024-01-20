import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { FooterComponent } from './footer/footer.component'
import { BlogComponent } from './blog/blog.component'
import { HeaderComponent } from './header/header.component'
import { CommonModule } from '@angular/common'

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
  ],
})
export class AppComponent {
  title = 'GewichtEnVoedingInBalans'
}
