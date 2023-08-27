import { Component, OnInit } from '@angular/core';
import { SetProvider } from '../../../../app-core/providers/set.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { MySetModel } from '../../../set/model/dto/my-set.model';
import {SetService} from "../../../set/set.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-my-set-list',
  templateUrl: './my-set-list.component.html',
  styleUrls: ['./my-set-list.component.less']
})
export class MySetListComponent implements OnInit {
  showTable = false;
  setList: MySetModel[] = [];
  showTableLoading = false;
  currentPageIndex = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private setProvider: SetProvider,
    private router: Router,
    private route: ActivatedRoute,
    public setService: SetService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pageIndex = Number(params['pageIndex']) || 1;
      this.currentPageIndex = pageIndex;
      this.getMySets(pageIndex, this.pageSize);
    });
  }

  getMySets(pageIndex: number, pageSize: number): void {
    this.showTableLoading = true;
    const userId = localStorage.getItem('userId');
    this.setProvider.getMySetsPaginated(Number(userId), pageIndex, pageSize).subscribe((res: any) => {
      this.setList = res.content;
      this.totalItems = res.totalElements;
      this.showTable = true;
      this.showTableLoading = false;
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;
    this.updateQueryParams({ pageIndex: pageIndex });
    this.getMySets(pageIndex, this.pageSize);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.updateQueryParams({ pageIndex: 1, pageSize });
    this.getMySets(1, pageSize);
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

  navigateToSetCardList(set: MySetModel) {
    this.setService.setSelectedSet(set);
    this.router.navigate(['/my-set-list', set.set_id], {queryParams: {pageIndex: 1, pageSize:10}});
  }

  deleteSet(set_id: number) {
    console.log(set_id)
    this.setProvider.deleteSet(set_id).subscribe( {
      next: () => {
        this.message.success('Set deleted successfully.');
        this.getMySets(this.currentPageIndex, this.pageSize);
      },
      error: (error) => {
        this.message.error('Error deleting set. Please try again later.');
      }
    })
  }
}
