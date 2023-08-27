import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {CardModel} from "../../../pages/card/model/dto/card.model";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent {
  @Input() isCollapsed!: boolean;
  @Output() isCollapsedChange = new EventEmitter<boolean>();
  isSmallScreen: boolean = window.innerWidth <= 765;
  term!: string;
  cardList: CardModel[] = [];
  isSearchSetsSelected: boolean = false;

  constructor(
    public router: Router,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.isSmallScreen = (event.target as Window).innerWidth <= 765;
  }


  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  navigateToSearchCards(): void {
    //window.location.reload();
    this.isSearchSetsSelected = false;
    this.router.navigate(['/card-list'], { replaceUrl: true }).then(() => {
      this.term = '';
      this.cardList = [];
    });
  }

  navigateToSearchSets(): void {
    this.isSearchSetsSelected = true;
    this.router.navigate(['/set-list']);
  }

  navigateToMySets(): void {
    this.isSearchSetsSelected = false;
    this.router.navigate(['/my-set-list'], {queryParams: {pageIndex: 1, pageSize:10}});
  }

  navigateToCreateSet(): void {
    this.isSearchSetsSelected = false;
    this.router.navigate(['/create-set']);
  }

  toggleSetsSubmenu(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.isCollapsedChange.emit(this.isCollapsed);

      // Select the first item in the submenu
      this.navigateToSearchSets();
    }
  }
}
