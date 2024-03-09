import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterLink, RouterLinkActive } from '@angular/router'
// import { MatMenuItem, MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list'
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
