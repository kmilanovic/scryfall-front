import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent {
  @Input() isCollapsed!: boolean;
  @Output() isCollapsedChange = new EventEmitter<boolean>();
  isSmallScreen: boolean = window.innerWidth <= 765;

  constructor(
    public router: Router,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.isSmallScreen = (event.target as Window).innerWidth <= 765;
  }

  trackByLink(index: number, item: any): string {
    return item.routerLink;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

}