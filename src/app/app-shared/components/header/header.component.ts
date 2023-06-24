import { Component, HostListener, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthProvider } from "../../../app-core/providers/auth.provider";
import {CardModel} from "../../../pages/card/model/dto/card.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() isCollapsed!: boolean;

  isXsScreen = window.innerWidth < 576;
  isSmScreen = window.innerWidth >= 576 && window.innerWidth < 768;
  user = localStorage.getItem('email');
  term!: string;
  cardList: CardModel[] = [];

  constructor(
    private router: Router,
    private authProvider: AuthProvider
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const w = event.target as Window;
    this.isXsScreen = w.innerWidth < 576;
    this.isSmScreen = w.innerWidth >= 576 && w.innerWidth < 576;
  }

  logout() {
    this.authProvider.logout();
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/card-list'], { replaceUrl: true }).then(() => {
      // Clear input field and table items
      this.term = '';
      this.cardList = [];
      window.location.reload();
    });
  }
}
