import { Component, OnInit } from '@angular/core';
import {SetModel} from "../../../set/model/dto/set.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CardProvider} from "../../../../app-core/providers/card.provider";
import {SetService} from "../../../set/set.service";
import {ByIdCommand} from "../../../card/model/command/by-id.command";
import {Observable, switchMap} from "rxjs";
import {CardDbModel} from "../../../card/model/dto/card-db.model";
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-my-set-card-list',
  templateUrl: './my-set-card-list.component.html',
  styleUrls: ['./my-set-card-list.component.less']
})
export class MySetCardListComponent implements OnInit {
  showTable = false;
  setCardList!: CardDbModel[];
  listOfCurrentPageData: readonly CardDbModel[] = [];
  showTableLoading = false;
  selectedSet!: SetModel | null
  currentPageIndex = 1;
  pageSize = 10;
  totalItems = 0;
  cardIds: string[] = [];
  totalPrice!: number;
  setId: number = 0;
  constructor(private route: ActivatedRoute,
              private cardProvider: CardProvider,
              private setService: SetService,
              private router: Router,
              private setProvider: SetProvider,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pageIndex = Number(params['pageIndex']) || 1;
      this.currentPageIndex = pageIndex;
      this.getCardsBySetId(pageIndex, this.pageSize);
    });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const command: ByIdCommand = new ByIdCommand();
        command.id = params.get('id');
        if (command.id != null) {
          this.setId = parseInt(command.id, 10);
        }

        return this.setProvider.getSetPrice(this.setId);
      })
    ).subscribe({
      next: (price: number) => {
        this.totalPrice = price;
      },
      error: (error) => {
        console.error('Error getting set price:', error);
      }
    });
  }

  getCardsBySetId(pageIndex: number, pageSize: number) {
    this.showTableLoading = true;
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const command: ByIdCommand = new ByIdCommand();
        command.id = params.get('id');

        return this.cardProvider.getCardsBySetIdPaginated(command, pageIndex, pageSize);
      })
    ).subscribe({
      next: (res: any) => {
        this.setCardList = res.content;
        this.totalItems = res.totalElements;
        this.selectedSet = this.setService.getSelectedSet();
        this.cardIds = this.setCardList.map(card => card.id);
        this.showTable = true;
        this.showTableLoading = false;
      },
      error: (error) => {
        console.error('Error retrieving cards:', error);
      }
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;
    this.updateQueryParams({ pageIndex: pageIndex });
    this.getCardsBySetId(pageIndex, this.pageSize);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.updateQueryParams({ pageIndex: 1, pageSize });
    this.getCardsBySetId(1, pageSize);
  }

  updateQueryParams(params: { [key: string]: any }): void {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      ...params
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  deleteCardFromSet(cardId: number) {
    // Get the setId from the URL parameters
    const setId = this.route.snapshot.paramMap.get('id');

    this.setProvider.deleteCardFromSet(setId, cardId).subscribe({
      next: () => {
        this.message.success('Card deleted successfully.');
        this.getCardsBySetId(this.currentPageIndex, this.pageSize);
      },
      error: (error) => {
        this.message.error('Error deleting card. Please try again later.');
      },
    });
  }

}
