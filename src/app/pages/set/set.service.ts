import { Injectable } from '@angular/core';
import {SetModel} from "./model/dto/set.model";
import {MySetModel} from "./model/dto/my-set.model";

@Injectable({
  providedIn: 'root'
})
export class SetService {
  private selectedSet: SetModel | null = null;

  private mySelectedSet: MySetModel | null = null;

  setSelectedSet(set: SetModel) {
    this.selectedSet = set;
  }

  getSelectedSet(): SetModel | null {
    return this.selectedSet;
  }

  setMySelectedSet(set: MySetModel) {
    this.mySelectedSet = set;
  }

  getMySelectedSet(): MySetModel | null {
    return this.mySelectedSet;
  }
}
