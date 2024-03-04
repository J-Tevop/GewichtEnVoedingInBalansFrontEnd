import { Component } from '@angular/core'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [NgbCarouselModule],
  standalone: true,
})
export class HomePageComponent {}
