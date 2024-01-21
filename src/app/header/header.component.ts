import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDropdownOpen = false

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }
}
